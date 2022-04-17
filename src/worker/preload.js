const { contextBridge, ipcRenderer } = require('electron')


contextBridge.exposeInMainWorld(
  "youtube", {
    downloadVideoAsMp3: async (videoUrl, onProgress) => {
      ipcRenderer.send("download-video-as-mp3", videoUrl)
      ipcRenderer.on("download-progress", (event, progress) => {onProgress(progress)})

      return await new Promise((resolve, reject) => {
        ipcRenderer.on("download-finished", (event) => {
          resolve()
        })
      })
    }
  }
)
