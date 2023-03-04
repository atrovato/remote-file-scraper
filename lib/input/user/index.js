const { selectUrl } = require('./selectUrl');
const { selectKind } = require('./selectKind');
const { selectDownloader } = require('./selectDownloader');

/**
 * Interactive mode: user must fill information.
 *
 * @example
 * const { url, kind, ... } = await userInput();
 */
async function userInput() {
  const url = await selectUrl();
  const kind = await selectKind();
  console.log('ici');
  const downloader = await selectDownloader();

  return { url, kind, downloader };
}

module.exports = userInput;
