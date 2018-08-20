const {
  GET_USERS,
  POST_CREATE_USER,
  GET_USER,
  PATCH_ADD_DOCUMENTS,
  PATCH_UPDATE_EXISTING_DOCUMENT,
  PATCH_DELETE_EXSITING_MAIN_DOC,
  PATCH_DELETE_EXSITING_SUB_DOCS,
  PATCH_UPDATE_USER,
} = require('../constants/apiReqNames');
const apiRequests = require('../apiReqs/apiRequests');

class ApiReqsLessArgs {
  constructor({ host, client_id, client_secret, oauth_key, fingerprint, user_id }) {
    this.host = host;
    this.client_id = client_id;
    this.client_secret = client_secret;
    this.oauth_key = oauth_key;
    this.fingerprint = fingerprint;
    this.user_id = user_id;
  }

  GET_USERS() {
    return apiRequests.users[GET_USERS]({
      host: this.host,
      client_id: this.client_id,
      client_secret: this.client_secret,
      fingerprint: this.fingerprint,
    });
  }

  POST_CREATE_USER(reqBody) {
    return apiRequests.users[POST_CREATE_USER]({
      reqBody,
      host: this.host,
      client_id: this.client_id,
      client_secret: this.client_secret,
      fingerprint: this.fingerprint,
    });
  }

  // module.exports[GET_USER] = userId => {
  //   return apiRequests.users[GET_USER]({
  //     user_id: userId,
  //     host,
  //     client_id,
  //     client_secret,
  //     fingerprint,
  //   });
  // };

  // module.exports[PATCH_ADD_DOCUMENTS] = (userId, documentObj) => {
  //   return apiRequests.users[PATCH_ADD_DOCUMENTS]({
  //     user_id: userId,
  //     documentObj,
  //     host,
  //     oauth_key,
  //     client_id,
  //     client_secret,
  //     fingerprint,
  //   });
  // };

  // module.exports[PATCH_UPDATE_EXISTING_DOCUMENT] = (userId, documentObj) => {
  //   return apiRequests.users[PATCH_UPDATE_EXISTING_DOCUMENT]({
  //     user_id: userId,
  //     documentObj,
  //     host,
  //     oauth_key,
  //     client_id,
  //     client_secret,
  //     fingerprint,
  //   });
  // };

  // module.exports[PATCH_DELETE_EXSITING_MAIN_DOC] = (userId, documentId) => {
  //   return apiRequests.users[PATCH_DELETE_EXSITING_MAIN_DOC]({
  //     user_id: userId,
  //     document_id: documentId,
  //     host,
  //     oauth_key,
  //     client_id,
  //     client_secret,
  //     fingerprint,
  //   });
  // };

  // module.exports[PATCH_DELETE_EXSITING_SUB_DOCS] = ({
  //   user_id,
  //   main_document_id,
  //   physical_docs,
  //   virtual_docs,
  //   social_docs,
  // }) => {
  //   return apiRequests.users[PATCH_DELETE_EXSITING_SUB_DOCS]({
  //     user_id,
  //     main_document_id,
  //     physical_docs,
  //     virtual_docs,
  //     social_docs,
  //     host,
  //     oauth_key,
  //     client_id,
  //     client_secret,
  //     fingerprint,
  //   });
  // };

  // module.exports[PATCH_UPDATE_USER] = (userId, updateObj) => {
  //   return apiRequests.users[PATCH_UPDATE_USER]({
  //     user_id: userId,
  //     updateObj,
  //     host,
  //     oauth_key,
  //     client_id,
  //     client_secret,
  //     fingerprint,
  //   });
  // };
}

module.exports = ApiReqsLessArgs;
