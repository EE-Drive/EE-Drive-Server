
const fs = require('fs');
const {LOG_FILES_NAMES} = require('./global.constants');
const {COLORS, STYLES} = require('./consoleStyle.constant');

/**
 * Used to log messages and errors to the log files.
 * Logger will log to console if not in PRODUCTION
 */
const logger = {

    /**
     * LOGS TO database.log
     * log start with the string 'DATABASE QUERY ->' colored green in console
     * 
     * @param {string} query DB query
     */
    databaseQuery(query){
        appendToFile(LOG_FILES_NAMES.DATABASE, `DATABASE QUERY -> ${query} in ${getTimeStamp()}`);
        printToConsole(COLORS.green(STYLES.bold('DATABASE QUERY')), `-> ${query}`);
    },

    /**
     * LOGS TO database.log
     * log start with the string 'DATABASE RESULT ->' colored blue in console
     * 
     * @param {string} result DB result 
     */
    databaseResult(result){
        appendToFile(LOG_FILES_NAMES.DATABASE, `DATABASE RESULT -> ${result} in ${getTimeStamp()}`);
        printToConsole(COLORS.blue(STYLES.bold('DATABASE RESULT')), `-> ${result}`);
    },

    /**
     * LOGS TO error.log
     * log start with the string 'DATABASE ERROR ->' colored red in console
     * 
     * @param {string} message 
     */
    databaseError(message){
        appendToFile(LOG_FILES_NAMES.ERRORS, `DATABASE ERROR -> ${message} in ${getTimeStamp()}`);
        printToConsole(COLORS.red(STYLES.bold('DATABASE ERROR')), `-> ${message}`);
    },

    /**
     * LOGS TO error.log
     * log start with the string 'ERROR ->' colored red in console
     * 
     * @param {*} message 
     */
    error(message){
        appendToFile(LOG_FILES_NAMES.ERRORS, `ERROR -> ${message} in ${getTimeStamp()}`);
        printToConsole(COLORS.red(STYLES.bold('ERROR')), `-> ${message}`);
    },

    /**
     * LOGS TO error.log
     * log start with the string 'WARNING ->' colored yellow in console
     * 
     * @param {*} message 
     */
    warning(message){
        appendToFile(LOG_FILES_NAMES.ERRORS, `WARNING -> ${message} in ${getTimeStamp()}`);
        printToConsole(COLORS.yellow(STYLES.bold('ERROR')), `-> ${message}`);
    },

    /**
     * LOGS TO info.log
     * log start with the string 'INFO ->' colored cyan in console
     * 
     * @param {*} message 
     */
    info(message){
        appendToFile(LOG_FILES_NAMES.INFO, `INFO -> ${message} in ${getTimeStamp()}`);
        printToConsole(COLORS.cyan(STYLES.bold('INFO')), `-> ${message}`);
    }, 

};

// used to get current date and time. format : d/m/yyyy @ hh:mm:ss
const getTimeStamp = () => {
    const d = new Date();
    return `${d.getDay()}/${d.getMonth() + 1}/${d.getFullYear()} @ ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
};

// used to append log to the log file
const appendToFile = (fileName, stringToWire) => {
    fs.appendFile(fileName, stringToWire + '\n', err => err && console.log(err));
};
    
// used to print to console only if not in PRODUCTION mode.
const printToConsole = (...args) => {
    String(process.env.NODE_ENV).trim() !== 'PRODUCTION' && console.log.apply(null, args);
};

module.exports = logger;