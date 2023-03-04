const { configure } = require('./configure');
const { download } = require('./download');
const { close } = require('./close');

module.exports = { title: 'Synology Download Station', key: 'dlstation', configure, download, close };
