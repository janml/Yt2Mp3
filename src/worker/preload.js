const { contextBridge, ipcRenderer } = require('electron')


contextBridge.exposeInMainWorld(
  "youtube", {

    getVideoMeta: async (videoUrl) => {
      ipcRenderer.send("get-video-meta", videoUrl)
      return await new Promise((resolve, reject) => {
        ipcRenderer.on("video-meta-resolved", (event, videoMeta) => {
          resolve(videoMeta)
        })
      })
    },
    
    downloadVideoAsMp3: (videoUrl, onProgress) => {
      ipcRenderer.send("download-video-as-mp3", videoUrl)
      ipcRenderer.on("download-progress", (event, progress) => {onProgress(progress)})
    }
  }
)
