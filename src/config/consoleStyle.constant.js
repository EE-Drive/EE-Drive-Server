
const reset = '\x1b[0m';

module.exports.COLORS = {
    black: (text) => '\x1b[30m' + text + reset,
    red: (text) => '\x1b[31m' + text + reset,
    green: (text) => '\x1b[32m' + text + reset,
    yellow: (text) => '\x1b[33m' + text + reset,
    blue: (text) => '\x1b[34m' + text + reset,
    magenta: (text) => '\x1b[35m' + text + reset,
    cyan: (text) => '\x1b[36m' + text + reset,
    white: (text) => '\x1b[37m' + text + reset
};

module.exports.STYLES = {
    bold: (text) => '\033[1m' + text + '\033[0m',
};