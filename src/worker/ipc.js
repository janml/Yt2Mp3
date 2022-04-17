const fs = require('fs')
const ytdl = require("ytdl-core")
const {ipcMain} = require("electron")
const {downloadYoutubeVideoAsMp3} = require("./tasks")


const initIPC = () => {
  ipcMain.on("get-video-meta", async (event, videoUrl) => {
    event.reply("video-meta-resolved", await ytdl.getInfo(videoUrl))
  }),

  ipcMain.on("download-video-as-mp3", async (event, videoUrl) => {
    await downloadYoutubeVideoAsMp3(videoUrl, (progress) => {
      event.sender.send("download-progress", progress)
    })
    event.reply("download-finished")
  })
}


module.exports = {initIPC}
