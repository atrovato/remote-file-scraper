const { configure } = require('./configure');
const { download } = require('./download');
const { close } = require('./close');

module.exports = { title: 'File list', key: 'filelist', configure, download, close };
