const colors = require('colors');

const inputInformation = require('./input');

/**
 * Start the main application.
 *
 * @example
 * await run()
 */
async function run() {
  // Reset terminal
  console.clear();
  console.info('Welcome to the remote file scraper utility!');
  console.info('To use it, simply aswer to questions.');
  console.info('Have fun!');
  console.info('');

  const { url, kind } = await inputInformation();

  console.info(colors.gray(`> Loading "${kind.title}" scraper...`));
  return kind.scrap(url);
}

module.exports = run;