const {ipcMain} = require('electron');
const events = require('./events');

console.log('Setting up interoperability with main and renderer');

ipcMain.on(events.logMessage, () => {
    console.log('Log message callback');
});