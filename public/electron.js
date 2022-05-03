const path = require('path');
const { app, BrowserWindow } = require('electron');
const isDev = require('electron-is-dev');

require('./electron/interop');

function createWindow() {
    // Create the browser window.
    const win = new BrowserWindow({
        minWidth: 768,
        minHeight: 640,
        width: 1024,
        height: 768,
        webPreferences: {
            preload: path.join(__dirname, 'electron', 'preload.js')
        },
    });

    // and load the index.html of the core.
    // win.loadFile("index.html");
    win.loadURL(
        isDev
            ? 'http://localhost:3000'
            : `file://${path.join(__dirname, '../build/index.html')}`
    );
    // Open the DevTools.
    if (isDev) {
        win.webContents.openDevTools({ mode: 'detach' });
    }
}

app.whenReady().then(createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bars to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});