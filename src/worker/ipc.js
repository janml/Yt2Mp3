const {ipcMain} = require("electron")
const ytdl = require("ytdl-core")


const initIPC = () => {
  ipcMain.on("get-video-meta", async (event, videoUrl) => {
    event.reply("video-meta-resolved", await ytdl.getInfo(videoUrl))
  })
}


module.exports = {initIPC}
