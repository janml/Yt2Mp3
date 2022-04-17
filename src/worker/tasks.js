const ytdl = require("ytdl-core")
const ffmpeg  = require("ffmpeg-static")
const {spawn} = require('child_process');


function getFFmpegConvertingConsumer(outputFile, outputFormat) {
  return spawn(
      ffmpeg, 
      [
          // Remove ffmpeg's console spamming
          '-loglevel', '8', '-hide_banner',
          // Redirect/Enable progress messages
          '-progress', 'pipe:3',
          // Set inputs
          '-i', 'pipe:4',
          // Map audio & video from streams
          '-map', '0:a',
          // Define output file
          `${outputFile}.${outputFormat}`,
      ], 
      {
          windowsHide: true,
          stdio: [
              /* Standard: stdin, stdout, stderr */
              'inherit', 'inherit', 'inherit',
              // Custom: pipe:3, pipe:4
              'pipe', 'pipe',
          ],
      }
  )
}


async function downloadYoutubeVideoAsMp3(videoUrl, onProgress) {
  let progress = {
      chunkLength: 0,
      processed: 0, 
      total: Infinity,
  }

  let onProgressCaller = null

  return await new Promise((resolve, reject) => {
    const download = ytdl(videoUrl, {quality: 'highestaudio'})
    const ffmpegConvertingConsumer = getFFmpegConvertingConsumer(`test`, "mp3")  // TODO: Do not hardcode the filename

    download.on('progress', (chunkLength, processed, total) => {
      progress = {chunkLength, processed, total}
    })
    
    ffmpegConvertingConsumer.on('close', () => {
      clearInterval(onProgressCaller)
      console.log("Finished.")
      resolve()
    })
      
    ffmpegConvertingConsumer.stdio[3].on('data', chunk => {
        if (!onProgressCaller) {
            onProgressCaller = setInterval(() => {onProgress(progress); console.log(progress)}, 10)
        }
    })

    download.pipe(ffmpegConvertingConsumer.stdio[4])
  }) 
}


module.exports = {downloadYoutubeVideoAsMp3}
