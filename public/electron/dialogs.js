const {dialog, ipcMain, BrowserWindow} = require('electron');
const events = require('./events');
const {logToFile} = require('./logging');
const videoExtensions = require('video-extensions');
const path = require('path');
const fs = require('fs');

logToFile('Dialogs: Setting up dialog management');

const videoFilter = {
    name: 'video',
    extensions: videoExtensions
};

async function openFileDialog(folder = false) {
    if (folder) {
        return await dialog.showOpenDialog(BrowserWindow.getFocusedWindow(), {
            title: 'Select folder to extract',
            properties: ['openDirectory']
        });
    }

    return await dialog.showOpenDialog(BrowserWindow.getFocusedWindow(), {
        title: 'Select video file to extract',
        properties: ['openFile', 'multiSelections'],
        filters: [videoFilter]
    });
}

ipcMain.on(events.openFileDialog, async (event) => {
    const result = await openFileDialog(false);

    if (result.canceled) {
       event.returnValue = null;
       return;
    }

    const {filePaths} = {...result};

    if (!filePaths) {
        event.returnValue = null;
        return;
    }

    event.returnValue = result.filePaths?.map(filePath => {
        const [name] = filePath?.split(path.sep)?.slice(-1);
        return {name, path: filePath};
    });
});

ipcMain.on(events.openFolderDialog, async (event) => {
    const result = await openFileDialog(true);

    if (result.canceled) {
        event.returnValue = null;
        return;
    }

    const [directoryPath] = result.filePaths;

    console.log('directory', directoryPath);

    if (!fs.lstatSync(directoryPath).isDirectory()) {
        event.returnValue = null;
        return;
    }


    fs.readdir(directoryPath, function (err, filePaths) {
        if (err) {
            logToFile(`Could not read directory '${directoryPath}: ${err}'`);
            return;
        }

        const files = filePaths.map(filePath => {
            const ext = path.extname(filePath)?.substring(1)
            if (videoExtensions.includes(ext)) {
                const [name] = filePath?.split(path.sep)?.slice(-1);
                return {name, path: filePath};
            }
        }).filter(p => p !== undefined);

        console.log(files);

        if (!files) {
            event.returnValue = null;
            return;
        }

        event.returnValue = files;
    });
});