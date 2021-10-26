const log4js = require('log4js')

log4js.configure({
    appenders: {
        logConsole: { type: 'console' },
        logFileWarn: { type: 'file', filename: 'warn.log' },
        logFileError: { type: 'file', filename: 'error.log' }
    },
    categories: {
        default: {appenders: ['logConsole'], level: 'info'},
        consoleWarn: {appenders: ['logConsole'], level: 'warn'},
        consoleErr: {appenders: ['logConsole'], level: 'error'},
        fileWarn: {appenders: ['logFileWarn'], level: 'warn'},
        fileErr: {appenders: ['logFileError'], level: 'error'}
    }
})

module.exports = log4js