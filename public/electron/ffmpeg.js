const {exec} = require('child_process');
const {logToFile} = require('./logging');
const os = require('os');

function getFFMpegVersion(settings) {
    exec('ffmpeg -version',  (error, stdout, stderr) => {
        if (error) {
            logToFile(`getFFMpegVersion: An exception when attempting to get ffmpeg version ${error}. Is ffmpeg in PATH?`);
            return null;
        }

        if (stderr) {
            logToFile(`getFFMpegVersion: An error occurred when attempting to get ffmpeg version ${error}. Is ffmpeg in PATH?`);
            return null;
        }

        const versionLine = stdout.split(os.EOL)[0];
        const version = versionLine.split(' ')[2].trim();
        logToFile(`Found ffmpeg version '${version}'`);

        if (settings) {
            settings.ffmpegVersion = version;
        }
    });
}

module.exports = {
    getFFMpegVersion
}