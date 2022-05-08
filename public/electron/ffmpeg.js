const {ipcMain} = require('electron');
const {exec} = require('child_process');
const {logToFile} = require('./logging');
const os = require('os');
const events = require('./events');
const {clearInterval} = require('timers');

ipcMain.on(events.startExtraction, async (event, file) => {
    logToFile(`Starting extraction on file ${file.path}`);

    const intervalTime = Math.round(Math.random() * 10) + 1;
    let interval = setInterval(() => {
        const progress = file.progress + intervalTime;
        file.progress = progress;

        if (file.progress >= 100) {
            file.progress = 100;
            clearInterval(interval);
        }

        event.sender.send(events.updateExtractionProgress, file);
    }, 300);
});

// Todo: retrieve ffmpeg from PATH environment variable
function getFFMpegVersion() {
    return new Promise((resolve) => {
        exec('ffmpeg -version',  (error, stdout, stderr) => {
            if (error) {
                logToFile(`getFFMpegVersion: An exception when attempting to get ffmpeg version ${error}. Is ffmpeg in PATH?`);
                resolve(null);
                return;
            }

            if (stderr) {
                logToFile(`getFFMpegVersion: An error occurred when attempting to get ffmpeg version ${error}. Is ffmpeg in PATH?`);
                resolve(null);
                return;
            }

            const versionLine = stdout.split(os.EOL)[0];
            const version = versionLine.split(' ')[2].trim();
            logToFile(`Found ffmpeg version '${version}'`);

            resolve(version);
        });
    });
}

module.exports = {
    getFFMpegVersion
}