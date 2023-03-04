const { CONFIG, logger } = require('../utils');
const batchInput = require('./batch');
const userInput = require('./user');

/**
 * Select or ask all requested information.
 *
 * @example
 * await inputInformation()
 */
async function inputInformation() {
  if (CONFIG.BATCH_MODE) {
    logger.debug('Entering batch mode...');
    return batchInput();
  }

  logger.debug('> Entering interactive mode...');
  return userInput();
}

module.exports = inputInformation;
