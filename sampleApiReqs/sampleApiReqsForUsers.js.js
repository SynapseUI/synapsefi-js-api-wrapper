const {
  GET_USERS,
  POST_CREATE_USER,
  GET_USER,
  PATCH_ADD_DOCUMENTS,
  PATCH_UPDATE_EXISTING_DOCUMENT,
  PATCH_DELETE_EXSITING_BASE_DOC,
  PATCH_DELETE_EXSITING_SUB_DOCS,
  PATCH_UPDATE_USER,
} = require('../constants/apiReqNames');
const apiRequests = require('../apiReqs/apiRequests');

const host = 'https://uat-api.synapsefi.com';
// const user_id = '5b17070501db700049a19bdc';
const oauth_key = 'oauth_AQO0t1nlM4EmeBYVaCR09gxUhL6id7csfupjX5vo';
const client_id = 'client_id_QCtyDlz7TMfeB8PxjYkagi2FL5WJ6qOKE1uAHvc3';
const client_secret = 'client_secret_vj1OLWpHEDBcZxXaKqt0mVYd2J6egyhPkAQ9fnUT';
const fingerprint = '31ee56fb53272d20d1a24381a1825e3d';

module.exports[GET_USERS] = () => {
  return apiRequests.users[GET_USERS]({
    host,
    client_id,
    client_secret,
    fingerprint,
  });
};

module.exports[POST_CREATE_USER] = reqBody => {
  return apiRequests.users[POST_CREATE_USER]({
    reqBody,
    host,
    client_id,
    client_secret,
    fingerprint,
  });
};

module.exports[GET_USER] = userId => {
  return apiRequests.users[GET_USER]({
    user_id: userId,
    host,
    client_id,
    client_secret,
    fingerprint,
  });
};

module.exports[PATCH_ADD_DOCUMENTS] = (userId, documentObj) => {
  return apiRequests.users[PATCH_ADD_DOCUMENTS]({
    user_id: userId,
    documentObj,
    host,
    oauth_key,
    client_id,
    client_secret,
    fingerprint,
  });
};

module.exports[PATCH_UPDATE_EXISTING_DOCUMENT] = (userId, documentObj) => {
  return apiRequests.users[PATCH_UPDATE_EXISTING_DOCUMENT]({
    user_id: userId,
    documentObj,
    host,
    oauth_key,
    client_id,
    client_secret,
    fingerprint,
  });
};

module.exports[PATCH_DELETE_EXSITING_BASE_DOC] = (userId, documentId) => {
  return apiRequests.users[PATCH_DELETE_EXSITING_BASE_DOC]({
    user_id: userId,
    document_id: documentId,
    host,
    oauth_key,
    client_id,
    client_secret,
    fingerprint,
  });
};

module.exports[PATCH_DELETE_EXSITING_SUB_DOCS] = ({
  user_id,
  base_document_id,
  physical_docs,
  virtual_docs,
  social_docs,
}) => {
  return apiRequests.users[PATCH_DELETE_EXSITING_SUB_DOCS]({
    user_id,
    base_document_id,
    physical_docs,
    virtual_docs,
    social_docs,
    host,
    oauth_key,
    client_id,
    client_secret,
    fingerprint,
  });
};

module.exports[PATCH_UPDATE_USER] = (userId, updateObj) => {
  return apiRequests.users[PATCH_UPDATE_USER]({
    user_id: userId,
    updateObj,
    host,
    oauth_key,
    client_id,
    client_secret,
    fingerprint,
  });
};
