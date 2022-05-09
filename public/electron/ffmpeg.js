const {ipcMain} = require('electron');
const {exec, spawn} = require('child_process');
const {logToFile} = require('./logging');
const os = require('os');
const events = require('./events');

function asSeconds(hour, minute, second) {
    return (hour * 60 * 60) + (minute * 60) + second;
}

// Example line of metadata: DURATION        : 05:01:26.041000000
function parseDuration(data) {
    const searchKey = 'DURATION';
    const parts = data.split(os.EOL);
    const durationPart = parts?.find(p => p.includes(searchKey))?.replace(/\s/g,'');

    if (durationPart) {
        const durationString = durationPart.substring(durationPart.lastIndexOf(searchKey) + searchKey.length + 1).trim();
        const [hour, minute, second] = durationString.replace('.', ':').split(':');

        return asSeconds(hour, minute, second);
    }

    return null;
}

// Example line of extraction: stderr: size=   80896kB time=01:06:41.69 bitrate= 165.6kbits/s speed= 105x
function parseTime(duration, data) {
    const time = data.substring(data.indexOf('time=') + 5, data.lastIndexOf('bitrate=')).trim();
    const [hour, minute, second] = time.replace('.', ':').split(':');

    return asSeconds(hour, minute, second);
}

ipcMain.on(events.startExtraction, async (event, file) => {
    logToFile(`Starting extraction on file '${file.path}'`);

    let duration = 0;
    const ffmpeg = spawn('ffmpeg', ['-y -i', `'${file.path}'`, '-q:a 0 -map a', `'${file.path}.mp3'`], { shell: true });
    ffmpeg.stdout.on('data', () => {/*ffmpeg doesn't send data to stdout but stderr*/});
    ffmpeg.stderr.on('data', (data) => {
        const output = data.toString();

        duration = parseDuration(output) || duration;

        // Actual ffmpeg progress output contains these fields
        if (data.includes('size=') && data.includes('time=') && output.includes('bitrate=')) {
            const time = parseTime(duration, output);
            file.progress = Math.round((time / duration) * 100);

            if (file.progress >= 100) {
                file.progress = 100;
            }

            event.sender.send(events.updateExtractionProgress, file);
        }
    });

    ffmpeg.on('close', (code) => {
        if (code === 0) {
            file.progress = 100;
            event.sender.send(events.updateExtractionProgress, file);
            logToFile(`Extractions of file '${file.path}' finished`);
        }
    });
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