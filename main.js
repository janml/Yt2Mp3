const path = require("path")
const { app, BrowserWindow } = require('electron')
const { initIPC } = require("./src/worker/ipc")


async function createWindow() {
  const win = new BrowserWindow({
    width: 400,
    height: 230,
    resizable: false,
    show: false,  // Hiding the window as long as the content is loading.
    autoHideMenuBar: true,
    backgroundColor: "#ffffff",
    icon: path.join(__dirname, "src", "resources", "icon.ico"),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true,
      preload: path.join(__dirname, "src", "worker", "preload.js")
    },
  })

  await win.loadFile(path.join(__dirname, "src", "renderer", "index.html"))
  initIPC()
  win.show()  // At this point our app is fully available. Let's show it to the user. 
}


app.on("ready", async () => {
  await createWindow()
})

app.on('window-all-closed', () => {
  app.quit()
})
