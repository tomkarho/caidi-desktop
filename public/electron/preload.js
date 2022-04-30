const { contextBridge, ipcRenderer } = require('electron');
const events = require('./events');

const api = {};
api[events.logMessage] = (message) => ipcRenderer.send(events.logMessage, message)

contextBridge.exposeInMainWorld('electron', api);