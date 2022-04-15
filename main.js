const path = require("path")
const { app, BrowserWindow } = require('electron')


async function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true,
      preload: path.join(__dirname, "src", "renderer", "preload.js")
    },
  })

  await win.loadFile('index.html')
  win.show()
}


app.on("ready", async () => {
  await createWindow()
})

app.on('window-all-closed', () => {
  app.quit()
})


// Hot-reloading in development
try {
  require('electron-reloader')(module, {
    watchRenderer: true,
    debug: true
  })
} catch (_) {}
