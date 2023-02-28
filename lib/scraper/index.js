const apache = require('./apache');
const archiveOrg = require('./archive.org');

const KIND_LIST = [apache, archiveOrg];

const KINDS = KIND_LIST.map((kind) => {
  const { title, disabled, description } = kind;
  return { title, disabled, description, value: kind };
});

module.exports = { KINDS };
