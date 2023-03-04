const colors = require('colors');
const Promise = require('bluebird');
const axios = require('axios');
const { parse } = require('node-html-parser');

/**
 * Scrap Apache URL list.
 *
 * @param {URL} url - The URL to parse.
 * @example
 * await scrap('https://apache-file-list.org');
 */
async function scrap(url) {
  const files = [];

  const { href } = url;
  console.debug(colors.gray(` > Scraping '${href}'`));

  const response = await axios.get(href);
  const document = parse(response.data);

  const rows = document.querySelectorAll('tr');

  await Promise.each(rows, async (row) => {
    const img = row.querySelector('img');
    if (img) {
      const fileType = img.getAttribute('alt');
      const anchor = row.querySelector('a');
      const link = anchor.getAttribute('href');
      const name = anchor.textContent;

      const fileUrl = new URL(link, href);
      const modifiedDateTxt = row.querySelectorAll('td')[2];
      if (fileType === '[DIR]') {
        // recursive for folders
        const dirFiles = await scrap(fileUrl);
        dirFiles.forEach((dirFile) => files.push(dirFile));
      } else {
        // file
        files.push({ url: fileUrl, name, date: modifiedDateTxt });
      }
    }
  });

  return files;
}

module.exports = { title: 'Apache', key: 'apache', scrap };
