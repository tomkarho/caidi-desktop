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

async function openFileDialog(event, folder = false) {
    logToFile(`Dialogs/openFileDialog: user is attempting to open ${folder ? 'folder' : ' file'} dialog`);
    const window = BrowserWindow.getFocusedWindow();
    if (folder) {
        return await dialog.showOpenDialog(window, {
            title: 'Select folder to extract',
            properties: ['openDirectory']
        });
    }

    return await dialog.showOpenDialog(window, {
        title: 'Select video file to extract',
        properties: ['openFile', 'multiSelections'],
        filters: [videoFilter]
    });
}

ipcMain.on(events.openFileDialog, async (event) => {
    const result = await openFileDialog(false);

    if (result.canceled) {
        logToFile(`Dialogs/onOpenFileDialog: user cancelled`);
        event.returnValue = null;
        return;
    }

    const {filePaths} = {...result};

    if (!filePaths) {
        event.returnValue = null;
        return;
    }

    logToFile(`Dialogs/onOpenFileDialog: ${filePaths.length} files selected`);

    event.returnValue = result.filePaths?.map(filePath => {
        const [name] = filePath?.split(path.sep)?.slice(-1);
        return {name, path: filePath};
    });
});

ipcMain.on(events.openFolderDialog, async (event) => {
    const result = await openFileDialog(event, true);

    if (result.canceled) {
        event.returnValue = null;
        return;
    }

    const [directoryPath] = result.filePaths;

    if (!fs.lstatSync(directoryPath).isDirectory()) {
        event.returnValue = null;
        return;
    }


    fs.readdir(directoryPath, function (err, filePaths) {
        if (err) {
            logToFile(`Could not read directory '${directoryPath}: ${err}'`);
            return;
        }

        const files = filePaths.map(file => {
            const ext = path.extname(file)?.substring(1)
            if (videoExtensions.includes(ext)) {
                const [name] = file?.split(path.sep)?.slice(-1);
                return {name, path: `${directoryPath}/${file}`};
            }
        }).filter(p => p !== undefined);

        if (!files) {
            event.returnValue = null;
            return;
        }

        logToFile(`Dialogs/onOpenFolderDialog: ${filePaths.length} files selected from '${directoryPath}'`);
        event.returnValue = files;
    });
});