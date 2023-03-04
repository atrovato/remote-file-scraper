const prompts = require('prompts');
const { DOWNLOADERS } = require('../../download');

const { CONFIG } = require('../../utils');
const { quit } = require('./quit');

/**
 * Interactive downloader input.
 *
 * @example
 * await selectDownloader()
 */
async function selectDownloader() {
  let initial;

  if (CONFIG.DOWNLOADER) {
    initial = DOWNLOADERS.findIndex((downloader) => downloader.key === CONFIG.DOWNLOADER);
  }

  const question = {
    type: 'select',
    name: 'downloader',
    message: 'Enter the downloader to get files',
    choices: DOWNLOADERS,
    warn: 'This downloader is not available yet',
    initial: Math.max(0, initial),
  };

  const { downloader } = await prompts(question, { onCancel: quit });
  return downloader;
}

module.exports = { selectDownloader };
