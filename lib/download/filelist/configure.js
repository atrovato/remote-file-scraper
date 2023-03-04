const prompts = require('prompts');
const path = require('path');

// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config();

const { CONFIG, quit } = require('../../utils');

/**
 * Configure list file generator.
 *
 * @param {object} options - Process options.
 * @example
 * const config = await configure({ ... });
 */
async function configure(options) {
  const initialLimit = process.env.FILELIST_LIMIT;
  const initialOutputDir = process.env.FILELIST_OUTPUT || path.join(options.resultDir, 'filelist');

  if (CONFIG.BATCH_MODE) {
    return { limit: initialLimit, outputDir: initialOutputDir };
  }

  const question = [
    {
      type: 'number',
      name: 'limit',
      message: 'Enter the maximum URLs by file',
      initial: initialLimit,
    },
    {
      type: 'text',
      name: 'outputDir',
      message: 'Enter the path where files will be generated',
      initial: initialOutputDir,
    },
  ];

  return prompts(question, { onCancel: quit });
}

module.exports = { configure };
