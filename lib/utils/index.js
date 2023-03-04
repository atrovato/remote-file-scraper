const { CONFIG } = require('./config');
const { logger } = require('./logger');
const { buildReport } = require('./buildReport');
const { printReport } = require('./printReport');

module.exports = { CONFIG, logger, buildReport, printReport };
