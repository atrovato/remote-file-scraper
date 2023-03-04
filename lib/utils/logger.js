const tracer = require('tracer');

const { CONFIG } = require('./config');

const logger = tracer.colorConsole({ level: CONFIG.LOG_LEVEL });

module.exports = { logger };
