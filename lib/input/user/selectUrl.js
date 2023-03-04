const prompts = require('prompts');
const { pathToFileURL } = require('url');

const { CONFIG } = require('../../utils');
const { quit } = require('../../utils/quit');

/**
 * Interactive URL input.
 *
 * @example
 * await selectUrl()
 */
async function selectUrl() {
  const question = {
    type: 'text',
    name: 'url',
    message: 'Enter the URL to scrap',
    initial: CONFIG.URL,
    validate: (value) => {
      try {
        try {
          // eslint-disable-next-line no-new
          new URL(value);
          return true;
        } catch (e) {
          pathToFileURL(`file://${value}`);
          return true;
        }
      } catch (e) {
        return 'Not a valid URL';
      }
    },
  };

  const { url } = await prompts(question, { onCancel: quit });
  try {
    return new URL(url);
  } catch (e) {
    return pathToFileURL(url);
  }
}

module.exports = { selectUrl };
