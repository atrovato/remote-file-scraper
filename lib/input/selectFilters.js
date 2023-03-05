const prompts = require('prompts');

const { quit, CONFIG } = require('../utils');

/**
 * Interactive downloader input.
 *
 * @param {object} fileReport - Scraped file report.
 * @example
 * await selectFilters({...})
 */
async function selectFilters(fileReport) {
  const envExtensionInclude = CONFIG.FILTER_EXTENSIONS.split(',')
    .map((extFilter) => extFilter.trim())
    .filter((ext) => ext && ext !== '');

  if (CONFIG.BATCH_MODE) {
    return { extensionInclude: envExtensionInclude };
  }

  const extensions = Object.values(fileReport.extensions)
    .map((extension) => extension.ext)
    .map((extension) => {
      return { title: extension, value: extension, selected: envExtensionInclude.includes(extension) };
    });

  const question = [
    {
      type: 'autocompleteMultiselect',
      name: 'extensionInclude',
      message: 'Select the extensions to download',
      choices: extensions,
    },
  ];

  return prompts(question, { onCancel: quit });
}

module.exports = { selectFilters };
