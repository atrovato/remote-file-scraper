const prompts = require('prompts');

const { quit, CONFIG } = require('../utils');
const { FILTER_MODES } = require('../utils/config');

/**
 * Interactive downloader input.
 *
 * @param {object} fileReport - Scraped file report.
 * @example
 * await selectFilters({...})
 */
async function selectFilters(fileReport) {
  const filteredExtensions = CONFIG.FILTER_EXTENSIONS.split(',')
    .map((extFilter) => extFilter.trim())
    .filter((ext) => ext && ext !== '');

  if (CONFIG.BATCH_MODE) {
    return { filteredExtensions };
  }

  const extensions = Object.values(fileReport.extensions)
    .map((extension) => extension.ext)
    .map((extension) => {
      let selected = filteredExtensions.includes(extension);
      if (CONFIG.FILTER_EXTENSION_MODE === FILTER_MODES.EXCLUDE) {
        selected = !selected;
      }
      return { title: extension, value: extension, selected };
    });

  const question = [
    {
      type: 'autocompleteMultiselect',
      name: 'filteredExtensions',
      message: 'Select the extensions to download',
      choices: extensions,
    },
  ];

  return prompts(question, { onCancel: quit });
}

module.exports = { selectFilters };
