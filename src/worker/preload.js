const { contextBridge, ipcRenderer } = require('electron')


contextBridge.exposeInMainWorld("youtube", {
  "getVideoMeta": () => {
    console.log("Would get video meta")
  }
})
