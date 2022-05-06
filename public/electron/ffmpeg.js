const {exec} = require('child_process');
const {logToFile} = require('./logging');

function getFFMpegVersion(path) {
    exec('ffmpeg -version',  (error, stdout, stderr) => {
        if (error) {

            logToFile(`getFFMpegVersion: An exception when attempting to get ffmpeg version ${error}`);
            return null;
        }

        if (stderr) {
            logToFile(`getFFMpegVersion: An error when attempting to get ffmpeg version ${error}`);
            return null;
        }

        console.info('Stdout', stdout);
    });

    return 'n5.0';
}

module.exports = {
    getFFMpegVersion
}