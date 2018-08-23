const {
  GET_USERS_DOCUMENT_TYPES,
  GET_USERS_ENTITY_TYPES,
  GET_USERS_ENTITY_SCOPES,
  GET_USERS,
  POST_CREATE_USER,
  GET_USER,
  PATCH_ADD_DOCUMENTS,
  PATCH_UPDATE_EXISTING_DOCUMENT,
  PATCH_DELETE_EXSITING_BASE_DOC,
  PATCH_DELETE_EXSITING_SUB_DOCS,
  PATCH_UPDATE_USER,
  PATCH_HIDE_USER,
  PATCH_LOCK_USER,
  // ---------------------------------
  POST_OAUTH_USER,
  // ---------------------------------
} = require('../constants/apiReqNames');
const apiRequests = require('../apiReqs/apiRequests');

class ClassForApiReqs {
  constructor({ host, client_id, client_secret, oauth_key, fingerprint, user_id, refresh_token }) {
    this.host = host;
    this.client_id = client_id;
    this.client_secret = client_secret;
    this.oauth_key = oauth_key;
    this.fingerprint = fingerprint;
    this.user_id = user_id;
    this.refresh_token = refresh_token;
  }

  GET_USERS_DOCUMENT_TYPES() {
    return apiRequests.users[GET_USERS_DOCUMENT_TYPES]({ host: this.host });
  }

  GET_USERS_ENTITY_TYPES() {
    return apiRequests.users[GET_USERS_ENTITY_TYPES]({ host: this.host });
  }

  GET_USERS_ENTITY_SCOPES() {
    return apiRequests.users[GET_USERS_ENTITY_SCOPES]({ host: this.host });
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

  GET_USER() {
    return apiRequests.users[GET_USER]({
      user_id: this.user_id,
      host: this.host,
      client_id: this.client_id,
      client_secret: this.client_secret,
      fingerprint: this.fingerprint,
    });
  }

  PATCH_ADD_DOCUMENTS(documentObj) {
    return apiRequests.users[PATCH_ADD_DOCUMENTS]({
      documentObj,
      user_id: this.user_id,
      host: this.host,
      oauth_key: this.oauth_key,
      client_id: this.client_id,
      client_secret: this.client_secret,
      fingerprint: this.fingerprint,
    });
  }

  PATCH_UPDATE_EXISTING_DOCUMENT(documentObj) {
    return apiRequests.users[PATCH_UPDATE_EXISTING_DOCUMENT]({
      documentObj,
      user_id: this.user_id,
      host: this.host,
      oauth_key: this.oauth_key,
      client_id: this.client_id,
      client_secret: this.client_secret,
      fingerprint: this.fingerprint,
    });
  }

  PATCH_DELETE_EXSITING_BASE_DOC(documentId) {
    return apiRequests.users[PATCH_DELETE_EXSITING_BASE_DOC]({
      document_id: documentId,
      user_id: this.user_id,
      host: this.host,
      oauth_key: this.oauth_key,
      client_id: this.client_id,
      client_secret: this.client_secret,
      fingerprint: this.fingerprint,
    });
  }

  PATCH_DELETE_EXSITING_SUB_DOCS({ base_document_id, physical_docs, virtual_docs, social_docs }) {
    return apiRequests.users[PATCH_DELETE_EXSITING_SUB_DOCS]({
      base_document_id,
      physical_docs,
      virtual_docs,
      social_docs,
      user_id: this.user_id,
      host: this.host,
      oauth_key: this.oauth_key,
      client_id: this.client_id,
      client_secret: this.client_secret,
      fingerprint: this.fingerprint,
    });
  }

  PATCH_UPDATE_USER(updateObj) {
    return apiRequests.users[PATCH_UPDATE_USER]({
      updateObj,
      user_id: this.user_id,
      host: this.host,
      oauth_key: this.oauth_key,
      client_id: this.client_id,
      client_secret: this.client_secret,
      fingerprint: this.fingerprint,
    });
  }

  PATCH_HIDE_USER() {
    return apiRequests.users[PATCH_HIDE_USER]({
      user_id: this.user_id,
      host: this.host,
      oauth_key: this.oauth_key,
      client_id: this.client_id,
      client_secret: this.client_secret,
      fingerprint: this.fingerprint,
    });
  }

  PATCH_LOCK_USER() {
    return apiRequests.users[PATCH_LOCK_USER]({
      user_id: this.user_id,
      host: this.host,
      oauth_key: this.oauth_key,
      client_id: this.client_id,
      client_secret: this.client_secret,
      fingerprint: this.fingerprint,
    });
  }
  // -------------------------------------------

  POST_OAUTH_USER() {
    return apiRequests.oauth[POST_OAUTH_USER]({
      user_id: this.user_id,
      refresh_token: this.refresh_token,
      host: this.host,
      client_id: this.client_id,
      client_secret: this.client_secret,
      fingerprint: this.fingerprint,
    });
  }

  // -------------------------------------------
}

module.exports = ClassForApiReqs;