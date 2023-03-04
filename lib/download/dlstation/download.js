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

  const { success, error } = data;
  if (!success) {
    const { code } = error;

    let message;
    switch (code) {
      case 101:
        message = 'Invalid parameter';
        break;
      case 102:
        message = 'The requested API does not exist';
        break;
      case 103:
        message = 'The requested method does not exist';
        break;
      case 104:
        message = 'The requested version does not support the functionality';
        break;
      case 105:
        message = 'The logged in session does not have permission';
        break;
      case 106:
        message = 'Session timeout';
        break;
      case 107:
        message = 'Session interrupted by duplicate login';
        break;
      case 100:
      default:
        message = 'Unknown error';
    }

    throw new Error(`Error creating Synology Download Station task: ${message}`);
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
