/**
 * Scrap Archive.org URL list.
 *
 * @param {string} url - The URL to parse.
 * @example
 * await scrap('https://archive.org/my-path');
 */
function scrap(url) {
  console.log('... Archive.org', url);
}

module.exports = { title: 'Archive.org', scrap, disabled: true };
