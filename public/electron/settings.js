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

    const settings = JSON.parse(fs.readFileSync(settingsFile) || '{}');
    console.log(settings);
});

ipcMain.on(events.saveSettings, async (event, settings) => {
    logToFile(`User is attempting to save settings ${JSON.stringify(settings)}`);
    fs.writeFileSync(settingsFile, JSON.stringify(settings, null, 2));
    event.returnValue = true;
});