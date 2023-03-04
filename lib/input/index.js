const colors = require('colors');

const { CONFIG } = require('../utils');
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
    console.debug(colors.gray('> Entering batch mode...'));
    return batchInput();
  }

  console.debug(colors.gray('> Entering interactive mode...'));
  return userInput();
}

module.exports = inputInformation;
