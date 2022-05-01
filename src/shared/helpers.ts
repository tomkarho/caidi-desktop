export function logToFile(message: string) {
    window.electron.logMessage(message);
}