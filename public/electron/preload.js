const { contextBridge, ipcRenderer } = require('electron');
const events = require('./events');

const api = {};
api[events.logMessage] = (message) => ipcRenderer.send(events.logMessage, message);
api[events.openFileDialog] = (message) => ipcRenderer.sendSync(events.openFileDialog, message);
api[events.openFolderDialog] = (message) => ipcRenderer.sendSync(events.openFolderDialog, message);
api[events.loadSettings] = () => ipcRenderer.sendSync(events.loadSettings);
api[events.saveSettings] = (settings) => ipcRenderer.send(events.saveSettings, settings);
api[events.startExtraction] = (file) => ipcRenderer.send(events.startExtraction, file);
api[events.listenForExtractionUpdate] = (handler) => {
    const callBack = (event, file) => handler(file);
    ipcRenderer.off(events.updateExtractionProgress, callBack);
    ipcRenderer.on(events.updateExtractionProgress, callBack);
};

contextBridge.exposeInMainWorld('electron', api);