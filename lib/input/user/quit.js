const { logger } = require('../../utils');

/**
 * Quit the program.
 *
 * @example
 * quit()
 */
function quit() {
  logger.warn('You leave the program, see you soon!');

  process.exit(1);
}

module.exports = { quit };
