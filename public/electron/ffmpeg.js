const {exec} = require('child_process');
const {logToFile} = require('./logging');
const os = require('os');

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