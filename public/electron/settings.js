const {app, ipcMain} = require('electron');
const fs = require('fs');
const {logToFile} = require('./logging');
const events = require('./events');

const settingsFolder = `${app.getPath('appData')}/caidi`;
const settingsFile = `${settingsFolder}/settings.json`;

if (!fs.existsSync(settingsFolder)) {
    fs.mkdirSync(settingsFolder);
}

const noFileError = 'no such file or directory';
fs.access(settingsFile, (error) => {
    if (error) {
       logToFile(`An error happened when attempting to access '${settingsFile}': ${error}`);
    }

    if (error?.message.includes(noFileError)) {
        fs.writeFileSync(settingsFile, JSON.stringify({}));
        return;
    }


});

ipcMain.on(events.saveSettings, (event, settings) => {
    if (!settings) {
        return;
    }

    logToFile(`User is attempting to save settings ${JSON.stringify(settings)}`);
    fs.writeFileSync(settingsFile, JSON.stringify(settings, null, 2));
});

ipcMain.on(events.loadSettings, (event) => {
    const settings = JSON.parse(fs.readFileSync(settingsFile) || '{}');
    logToFile(`Loaded settings from file ${settingsFile}: ${JSON.stringify(settings)}`);
    event.returnValue = settings;
});