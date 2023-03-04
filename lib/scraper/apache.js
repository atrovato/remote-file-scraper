const Promise = require('bluebird');
const axios = require('axios');
const { parse } = require('node-html-parser');

const { logger } = require('../utils');

const SIZE_REGEX = /(\d+(\.\d+)?)([ BMGKT])/i;

const parseSize = (sizeTxt) => {
  const match = sizeTxt.match(SIZE_REGEX);

  if (!match || match.length < 4) {
    throw new Error('Unable to parse file size');
  }

  const size = Number.parseFloat(match[1]);
  const unit = match[3].toUpperCase();
  let multiplier;

  switch (unit) {
    case ' ':
    case 'B':
      multiplier = 1;
      break;
    case 'K':
      multiplier = 3;
      break;
    case 'M':
      multiplier = 6;
      break;
    case 'G':
      multiplier = 9;
      break;
    case 'T':
      multiplier = 12;
      break;
    default:
      throw new Error(`Unable to parse file size with unit ${unit}`);
  }

  return Math.floor(size * 10 ** multiplier);
};

/**
 * Scrap Apache URL list.
 *
 * @param {URL} url - The URL to parse.
 * @example
 * const files = await scrap({ href: 'https://apache-file-list.org' });
 */
async function scrap(url) {
  const files = [];

  const { href } = url;
  logger.trace('Scraping "%s"', href);

  const response = await axios.get(href);
  const document = parse(response.data);

  const rows = document.querySelectorAll('tr');

  await Promise.each(rows, async (row) => {
    const cells = row.querySelectorAll('td');
    if (cells.length === 0) {
      return;
    }

    const img = cells[0].querySelector('img');
    if (img) {
      const fileType = img.getAttribute('alt');

      const anchor = cells[1].querySelector('a');
      const link = anchor.getAttribute('href');
      const name = anchor.textContent;

      const fileUrl = new URL(link, href);

      switch (fileType) {
        case '[ICO]':
        case '[PARENTDIR]':
          return;
        case '[DIR]': {
          // recursive for folders
          const dirFiles = await scrap(fileUrl);
          dirFiles.forEach((dirFile) => files.push(dirFile));
          return;
        }
        default: {
          // file
          const modifiedDateTxt = cells[2].textContent.trim();
          const fileSizeTxt = cells[3].textContent;
          const size = parseSize(fileSizeTxt);
          files.push({ url: fileUrl.href, name, date: modifiedDateTxt, size });
        }
      }
    }
  });

  return files;
}

module.exports = { title: 'Apache', key: 'apache', scrap };
