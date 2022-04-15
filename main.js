const path = require("path")
const { app, BrowserWindow } = require('electron')


async function createWindow() {
  const win = new BrowserWindow({
    width: 500,
    height: 300,
    show: false,  // Hiding the window as long as the content is loading.
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true,
      preload: path.join(__dirname, "src", "renderer", "preload.js")
    },
  })

  await win.loadFile('index.html')
  win.show()  // At this point our app is fully available. Let's show it to the user. 
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
    debug: true,
    ignore: ["dist"]
  })
} catch (_) {}
