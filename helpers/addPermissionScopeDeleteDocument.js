const _ = require('lodash');

module.exports = docs => {
  return _.cloneDeep(docs).map(docObj => {
    docObj.permission_scope = 'DELETE_DOCUMENT';
    return docObj;
  });
};
