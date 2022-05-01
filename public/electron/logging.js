const {ipcMain} = require('electron');
const events = require('./events');
const fs = require('fs');
const os = require('os');

console.log('Setting up logging');

const getTimeParts = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const day = now.getDate();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const second = now.getMinutes();
    const milliseconds = now.getMilliseconds();

    return {year, month, day, hour, minute, second, milliseconds};
};

const {year, month, day} = getTimeParts();
const logsFolder = 'logs';
const logFile = `${logsFolder}/caidi-${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}.log`;

if (!fs.existsSync(logsFolder)){
    fs.mkdirSync(logsFolder, { recursive: true });
}

function logToFile(message) {
    const {hour, minute, second, milliseconds} = getTimeParts();
    const timeStamp = `${os.EOL}[${hour}:${minute}:${second}.${milliseconds}]`
    const logMessage = `${timeStamp}: ${message}`;

    console.info(logMessage);
    fs.appendFile(logFile, logMessage, error => {
        if (error) {
            console.error(`Failed to write message '${message}' to file ${logFile}`, error);
        }
    });
}

ipcMain.on(events.logMessage, (_, message) => logToFile(message));

module.exports = {logToFile};