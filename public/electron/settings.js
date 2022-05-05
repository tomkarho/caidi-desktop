const {app} = require('electron');
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
        fs.appendFileSync(settingsFile, JSON.stringify({}));
        return;
    }

    const settings = JSON.parse(fs.readFileSync(settingsFile) || '{}');
    console.log(settings);
});