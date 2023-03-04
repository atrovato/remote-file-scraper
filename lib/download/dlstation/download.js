const Promise = require('bluebird');
const axios = require('axios');
const { logger } = require('../../utils');

/**
 * Download a single file with Synology Download Station.
 *
 * @param {string} fileUrl - File URL to download.
 * @param {object} config - Client configuration.
 * @example
 * await downloadFile('https://...', { sessionId, downloadUrl });
 */
async function downloadFile(fileUrl, config) {
  logger.debug('Download %s', fileUrl);
  const { downloadInfo, sessionId, downloadUrl } = config;

  const params = new URLSearchParams({
    api: downloadInfo.api,
    version: downloadInfo.maxVersion,
    method: 'create',
    _sid: sessionId,
    uri: fileUrl,
  });

  const { data } = await axios.post(`${downloadUrl}/webapi/${downloadInfo.path}`, params);
  if (!data.success) {
    throw new Error(`Receiving error ${data.error.code} while creating Synology Download Station task`);
  }
}

/**
 * Download all files with Synology Download Station.
 *
 * @param {Array} files - Files to download.
 * @param {object} config - Client configuration.
 * @example
 * await download([ ... ], { url, username, password });
 */
async function download(files, config) {
  await Promise.mapSeries(files, async (file) => downloadFile(file.url, config));
}

module.exports = { download };
