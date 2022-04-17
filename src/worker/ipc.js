const {ipcMain} = require("electron")
const ytdl = require("ytdl-core")
const fs = require('fs')


const initIPC = () => {
  ipcMain.on("get-video-meta", async (event, videoUrl) => {
    event.reply("video-meta-resolved", await ytdl.getInfo(videoUrl))
  }),

  ipcMain.on("download-video-as-mp3", async (event, videoUrl) => {
    const download = ytdl(videoUrl, {quality: "highestaudio"})
    
    download.on("progress", (chunkLength, downloaded, total) => {
      console.log(`Downloading: ${videoUrl} (${downloaded}/${total}) ...`)
      event.sender.send("download-progress", {chunkLength, downloaded, total})
    })

    download.on("end", () => {
      event.reply("download-finished")
    })

    download.pipe(fs.createWriteStream("test.mp3"))
  })
}


module.exports = {initIPC}
