const {ipcMain} = require('electron');
const events = require('./events');
const fs = require('fs');
const os = require('os');

console.log('Setting up logging');

function pad(number) {
    return number.toString().length > 1 ? number : `0${number}`;
}

const getTimeParts = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = pad(now.getMonth());
    const day = pad(now.getDate());
    const hour = pad(now.getHours());
    const minute = pad(now.getMinutes());
    const second = pad(now.getSeconds());
    const milliseconds = now.getMilliseconds();

    return {year, month, day, hour, minute, second, milliseconds};
};

const {year, month, day} = getTimeParts();
const logsFolder = 'logs';
const logFile = `${logsFolder}/caidi-${year}-${month}-${day}.log`;

if (!fs.existsSync(logsFolder)){
    fs.mkdirSync(logsFolder, { recursive: true });
}

function logToFile(message, traceLevel = 'info') {
    const {hour, minute, second, milliseconds} = getTimeParts();
    const timeStamp = `${os.EOL}${hour}:${minute}:${second}.${milliseconds}`;
    const logMessage = `${timeStamp} [${traceLevel.toUpperCase()}]: ${message}`;

    fs.appendFile(logFile, logMessage, error => {
        if (error) {
            console.error(`Failed to write message '${message}' to file ${logFile}`, error);
        }
    });
}

ipcMain.on(events.logMessage, (_, message) => logToFile(message));

module.exports = {logToFile};