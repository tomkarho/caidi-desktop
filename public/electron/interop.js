const {ipcMain} = require('electron');
const events = require('./events');
const fs = require('fs');

console.log('Setting up interoperability with main and renderer');

const getTimeParts = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const day = now.getDate();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const seconds = now.getMinutes();

    return {year, month, day, hour, minute, seconds};
};

const {year, month, day} = getTimeParts();
const logsFolder = 'logs';
const logFile = `${logsFolder}/caidi-${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}.log`;

if (!fs.existsSync(logsFolder)){
    fs.mkdirSync(logsFolder);
}

ipcMain.on(events.logMessage, (event, message) => {
    console.log(message);
    fs.writeFileSync(logFile, message, error => {
        console.error(`Failed to write message '${message}' to file ${logFile}`, error);
    });
});