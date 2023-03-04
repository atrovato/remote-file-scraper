const fs = require('fs/promises');
const os = require('os');
const path = require('path');
const Promise = require('bluebird');

const { logger } = require('../../utils');

/**
 * Generate files with list of URLs.
 *
 * @param {Array} files - Files to download.
 * @param {object} config - Client configuration.
 * @example
 * await download([ ... ], { url, username, password });
 */
async function download(files, config) {
  logger.debug('"listfile" started with %j', config);

  const { limit, outputDir } = config;
  let fixedLimit = files.length;
  if (limit > 0) {
    fixedLimit = Math.min(limit, fixedLimit);
  }

  await fs.mkdir(outputDir, { recursive: true });

  const chunks = [];
  for (let i = 0; i < files.length; i += fixedLimit) {
    const chunk = files.slice(i, i + fixedLimit).map((file) => file.url);
    chunks.push(chunk);
  }

  const outputFiles = await Promise.mapSeries(chunks, async (chunk, index) => {
    const output = path.join(outputDir, `filelist_${index + 1}.txt`);
    await fs.writeFile(output, chunk.join(os.EOL));
    return output;
  });

  logger.info(`Files well written:${os.EOL}  - %s`, outputFiles.join(`${os.EOL}  - `));
}

module.exports = { download };
