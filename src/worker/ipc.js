const {ipcMain} = require("electron")
const {downloadYoutubeVideoAsMp3} = require("./tasks")


const initIPC = () => {
  ipcMain.on("download-video-as-mp3", async (event, videoUrl) => {
    await downloadYoutubeVideoAsMp3(videoUrl, (progress) => {
      event.sender.send("download-progress", progress)
    })
    event.reply("download-finished")
  })
}


module.exports = {initIPC}
