const { app, BrowserWindow } = require('electron')
const remote = require('@electron/remote/main')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        autoHideMenuBar: true,
        title: "waterfall overlay",
        alwaysOnTop: true,
        transparent: true,
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: false
        }
    })

    //win.setMenu(null);
    win.loadFile('index.html')
}

app.whenReady().then(() => {
    createWindow()
    remote.initialize()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})