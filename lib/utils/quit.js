const colors = require('colors');

/**
 * Quit the program.
 *
 * @example
 * quit()
 */
function quit() {
  console.info();
  console.warn(colors.red('You leave the program, see you soon!'));

  process.exit(1);
}

module.exports = { quit };
