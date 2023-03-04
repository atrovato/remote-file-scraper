const axios = require('axios');
const prompts = require('prompts');

const { CONFIG, quit } = require('../../utils');

/**
 * Configure Synology Download Station downloader.
 *
 * @example
 * const config = await configure();
 */
async function configure() {
  let downloadUrl = process.env.DOWNLOADSTATION_URL;
  let account = process.env.DOWNLOADSTATION_ACCOUNT;
  let password = process.env.DOWNLOADSTATION_PASSWORD;

  if (!CONFIG.BATCH_MODE) {
    const question = [
      {
        type: 'text',
        name: 'inputUrl',
        message: 'Enter the URL of Synology Dowload Station',
        initial: downloadUrl,
      },
      {
        type: 'text',
        name: 'inputAccount',
        message: 'Enter the account to use (username)',
        initial: account,
      },
      {
        type: 'password',
        name: 'inputPassword',
        message: 'Enter the password of the account',
        initial: password,
      },
    ];

    const { inputUrl, inputAccount, inputPassword } = await prompts(question, { onCancel: quit });
    downloadUrl = inputUrl;
    account = inputAccount;
    password = inputPassword;
  }

  const authAPI = 'SYNO.API.Auth';
  const dlAPI = 'SYNO.DownloadStation.Task';

  const { data: apiData } = await axios.get(`${downloadUrl}/webapi/auth.cgi`, {
    params: {
      api: 'SYNO.API.Info',
      version: 1,
      method: 'query',
      query: [authAPI, dlAPI].join(','),
    },
  });

  const authInfo = apiData.data[authAPI];
  authInfo.api = authAPI;

  const downloadInfo = apiData.data[dlAPI];
  downloadInfo.api = dlAPI;

  const { data } = await axios.get(`${downloadUrl}/webapi/${authInfo.path}`, {
    params: {
      api: authAPI,
      version: authInfo.maxVersion,
      method: 'login',
      session: 'DownloadStation',
      format: 'sid',
      account,
      passwd: password,
    },
  });

  const { success, error, data: synData } = data;
  if (!success) {
    throw new Error(`Unable to connect to Synology Download Station: error ${error.code}`);
  }

  return { downloadUrl, sessionId: synData.sid, downloadInfo, authInfo };
}

module.exports = { configure };

module.exports = { configure };
