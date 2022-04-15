const { app, BrowserWindow } = require('electron')


async function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
    },
  })

  await win.loadFile('index.html')
  win.show()
}


app.on("ready", async () => {
  await createWindow()
})


// Hot-reloading in development
try {
  require('electron-reloader')(module, {
    watchRenderer: true,
    debug: true
  })
} catch (_) {}
