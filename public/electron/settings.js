const {app, ipcMain} = require('electron');
const fs = require('fs');
const {logToFile} = require('./logging');
const events = require('./events');
const {getFFMpegVersion} = require('./ffmpegWrapper');

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
    }
});

ipcMain.on(events.saveSettings, (event, settings) => {
    if (!settings) {
        return;
    }

    delete settings.ffmpegVersion;

    logToFile(`User is attempting to save settings ${JSON.stringify(settings)}`);
    fs.writeFileSync(settingsFile, JSON.stringify(settings, null, 2));
});

ipcMain.on(events.loadSettings, async (event) => {
    const settings = JSON.parse(fs.readFileSync(settingsFile) || '{}');
    settings.ffmpegVersion = await getFFMpegVersion();

    logToFile(`Loaded settings from file ${settingsFile}: ${JSON.stringify(settings)}`);
    event.returnValue = settings;
});