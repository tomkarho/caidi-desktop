const {dialog, ipcMain, BrowserWindow} = require('electron');
const events = require('./events');
const {logToFile} = require('./logging');
const videoExtensions = require('video-extensions');

logToFile('Dialogs: Setting up dialog management');

const videoFilter = {
    name: 'video',
    extensions: videoExtensions
};

ipcMain.on(events.openFileDialog, async (event) => {
    logToFile('Dialogs: user wants to open file dialog');

    const result = await dialog.showOpenDialog(BrowserWindow.getFocusedWindow(), {
        title: 'Select video file to extract',
        properties: ['openFile', 'multiSelections'],
        filters: [videoFilter]
    });

    if (result.canceled) {
        logToFile('Dialogs: User cancelled');
        return;
    }

    logToFile(`Dialogs: User selected ${result.filePaths.length} files`);
    event.returnValue = result.filePaths;
});

ipcMain.on(events.openFolderDialog, async (event) => {
    logToFile('Dialogs: user wants to open directory dialog');
    const result = await dialog.showOpenDialog(BrowserWindow.getFocusedWindow(), {
        title: 'Select folder to extract',
        properties: ['openDirectory']
    });

    if (result.canceled) {
        logToFile('Dialogs: User cancelled');
        return;
    }

    logToFile(`Dialogs: User selected folder '${result.filePaths[0]}'`);
    event.returnValue = result.filePaths;
});