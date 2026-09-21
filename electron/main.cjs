const { app, BrowserWindow, shell } = require('electron')
const path = require('node:path')

const isDevelopment = Boolean(process.env.ELECTRON_START_URL)

const createWindow = () => {
  const window = new BrowserWindow({
    width: 430,
    height: 860,
    minWidth: 320,
    minHeight: 568,
    show: false,
    backgroundColor: '#f5f7fb',
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
  })

  window.once('ready-to-show', () => {
    window.show()
  })

  window.webContents.setWindowOpenHandler(({ url }) => {
    if (/^https?:\/\//i.test(url)) {
      shell.openExternal(url)
    }

    return { action: 'deny' }
  })

  if (isDevelopment) {
    window.loadURL(process.env.ELECTRON_START_URL)
  } else {
    window.loadFile(path.join(__dirname, '..', 'dist', 'index.html'))
  }
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
