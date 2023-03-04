const { CONFIG } = require('./config');
const { logger } = require('./logger');
const { buildReport } = require('./buildReport');
const { printReport } = require('./printReport');
const { quit } = require('./quit');

module.exports = { CONFIG, logger, buildReport, printReport, quit };
