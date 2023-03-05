const prompts = require('prompts');
const { sizeFormatter } = require('human-readable');

const format = sizeFormatter();

const { quit } = require('../../utils');

/**
 * Ask user if he really want to start download phase.
 *
 * @param {Array} fileReport - Report of files to download.
 * @example
 * await continueDownload([...]);
 */
async function continueDownload(fileReport) {
  const question = {
    type: 'confirm',
    name: 'startDownload',
    message: `Continue downloading ${fileReport.files.length} files (${format(fileReport.size)})?`,
    initial: true,
  };

  const { startDownload } = await prompts(question, { onCancel: quit });
  return startDownload;
}

module.exports = { continueDownload };
