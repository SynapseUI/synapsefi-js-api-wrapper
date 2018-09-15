const {
  GET_USERS_DOCUMENT_TYPES,
  GET_USERS_ENTITY_TYPES,
  GET_USERS_ENTITY_SCOPES,
  GET_ALL_CLIENT_USERS,
  POST_CREATE_USER,
  GET_USER,
  PATCH_ADD_DOCUMENT,
  PATCH_UPDATE_DOCUMENT,
  PATCH_DELETE_BASE_DOC,
  PATCH_DELETE_SUB_DOCS,
  PATCH_UPDATE_USER,
  PATCH_USER_PERMISSION,
  // ---------------------------------
  //
  //
  // OAUTH  --------------------------
  POST_OAUTH_USER,
  // ---------------------------------
  //
  //
  // NODES  --------------------------
  GET_ALL_USER_NODES,
  GET_NODE,
  POST_CREATE_NODE,
  DELETE_NODE,
  POST_ACH_WITH_LOGIN,
  POST_ACH_WITH_MFA,
  PATCH_UPDATE_NODE,
  PATCH_REISSUE_DEBIT_CARD,
  PATCH_REORDER_DEBIT_CARD,
  POST_ACH_WITH_AC_RN,
  PATCH_REINITIATE_MICRO_DEPOSIT,
  PATCH_VERIFY_MICRO_DEPOSIT,
  // ---------------------------------
  //
  //
  // TRANSACTION  --------------------
  //
  // ---------------------------------
  //
} = require('../constants/apiReqNames');
const apiRequests = require('../apiReqs/apiRequests');

class ApiFactory {
  constructor({
    host,
    client_id,
    client_secret,
    oauth_key,
    fingerprint,
    user_id,
    refresh_token,
    ip_address,
  }) {
    this.host = host;
    this.client_id = client_id;
    this.client_secret = client_secret;
    this.oauth_key = oauth_key;
    this.fingerprint = fingerprint;
    this.user_id = user_id;
    this.refresh_token = refresh_token;
    this.ip_address = ip_address;
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

  GET_ALL_CLIENT_USERS(queryParamsObj = {}) {
    const { query, page, per_page, show_refresh_tokens } = queryParamsObj;

    return apiRequests.users[GET_ALL_CLIENT_USERS]({
      host: this.host,
      client_id: this.client_id,
      client_secret: this.client_secret,
      fingerprint: this.fingerprint,
      ip_address: this.ip_address,
      query,
      page,
      per_page,
      show_refresh_tokens,
    });
  }

  POST_CREATE_USER({ reqBody }) {
    return apiRequests.users[POST_CREATE_USER]({
      reqBody,
      host: this.host,
      client_id: this.client_id,
      client_secret: this.client_secret,
      fingerprint: this.fingerprint,
      ip_address: this.ip_address,
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

  PATCH_ADD_DOCUMENT({ reqBody, documentObj }) {
    return apiRequests.users[PATCH_ADD_DOCUMENT]({
      reqBody,
      documentObj,
      user_id: this.user_id,
      host: this.host,
      oauth_key: this.oauth_key,
      client_id: this.client_id,
      client_secret: this.client_secret,
      fingerprint: this.fingerprint,
      ip_address: this.ip_address,
    });
  }

  PATCH_UPDATE_DOCUMENT({ reqBody, documentObj }) {
    return apiRequests.users[PATCH_UPDATE_DOCUMENT]({
      reqBody,
      documentObj,
      user_id: this.user_id,
      host: this.host,
      oauth_key: this.oauth_key,
      client_id: this.client_id,
      client_secret: this.client_secret,
      fingerprint: this.fingerprint,
      ip_address: this.ip_address,
    });
  }

  PATCH_DELETE_BASE_DOC({ reqBody, documentId }) {
    return apiRequests.users[PATCH_DELETE_BASE_DOC]({
      reqBody,
      documentId,
      user_id: this.user_id,
      host: this.host,
      oauth_key: this.oauth_key,
      client_id: this.client_id,
      client_secret: this.client_secret,
      fingerprint: this.fingerprint,
      ip_address: this.ip_address,
    });
  }

  PATCH_DELETE_SUB_DOCS({ reqBody, baseDocId, physicalDocIds, socialDocIds, virtualDocIds }) {
    return apiRequests.users[PATCH_DELETE_SUB_DOCS]({
      reqBody,
      baseDocId,
      physicalDocIds,
      socialDocIds,
      virtualDocIds,
      user_id: this.user_id,
      host: this.host,
      oauth_key: this.oauth_key,
      client_id: this.client_id,
      client_secret: this.client_secret,
      fingerprint: this.fingerprint,
      ip_address: this.ip_address,
    });
  }

  PATCH_UPDATE_USER({ reqBody, updateObj }) {
    return apiRequests.users[PATCH_UPDATE_USER]({
      reqBody,
      updateObj,
      user_id: this.user_id,
      host: this.host,
      oauth_key: this.oauth_key,
      client_id: this.client_id,
      client_secret: this.client_secret,
      fingerprint: this.fingerprint,
      ip_address: this.ip_address,
    });
  }

  PATCH_USER_PERMISSION({ reqBody, permissionStr }) {
    return apiRequests.users[PATCH_USER_PERMISSION]({
      reqBody,
      permissionStr,
      user_id: this.user_id,
      host: this.host,
      oauth_key: this.oauth_key,
      client_id: this.client_id,
      client_secret: this.client_secret,
      fingerprint: this.fingerprint,
      ip_address: this.ip_address,
    });
  }

  // ------------------------------------------------------------------------
  POST_OAUTH_USER() {
    return apiRequests.oauth
      [POST_OAUTH_USER]({
        user_id: this.user_id,
        refresh_token: this.refresh_token,
        host: this.host,
        client_id: this.client_id,
        client_secret: this.client_secret,
        fingerprint: this.fingerprint,
        ip_address: this.ip_address,
      })
      .then(({ data }) => {
        this.oauth_key = data.oauth_key;
        this.refresh_token = data.refresh_token;
        return { data };
      });
  }
  // ------------------------------------------------------------------------
  //
  //
  //
  // NODES  -----------------------------------------------------------------
  POST_CREATE_NODE({ reqBody }) {
    return apiRequests.nodes[POST_CREATE_NODE]({
      reqBody,
      userInfo: this,
    });
  }

  GET_ALL_USER_NODES(queryParamsObj) {
    // queryParamsObj =
    // {
    //   page:
    //   per_page:
    //   type:
    // }
    return apiRequests.nodes[GET_ALL_USER_NODES]({
      page: queryParamsObj ? queryParamsObj.page : undefined,
      per_page: queryParamsObj ? queryParamsObj.per_page : undefined,
      type: queryParamsObj ? queryParamsObj.type : undefined,
      userInfo: this,
    });
  }

  DELETE_NODE({ node_id }) {
    return apiRequests.nodes[DELETE_NODE]({
      node_id,
      userInfo: this,
    });
  }

  GET_NODE({ node_id }) {
    return apiRequests.nodes[GET_NODE]({
      node_id,
      userInfo: this,
    });
  }

  POST_ACH_WITH_LOGIN({ bank_id, bank_pw, bank_name }) {
    return apiRequests.nodes[POST_ACH_WITH_LOGIN]({
      bank_id,
      bank_pw,
      bank_name,
      userInfo: this,
    });
  }

  POST_ACH_WITH_MFA({ access_token, mfa_answer }) {
    return apiRequests.nodes[POST_ACH_WITH_MFA]({
      access_token,
      mfa_answer,
      userInfo: this,
    });
  }
  // ------------------------------------------------------------------------
  //
  //
  //
  // TRANSACTION  ------------------------------------------------------------------
  //
  // -------------------------------------------------------------------------------
  //
}

ApiFactory.testFunc = ApiFactory;
module.exports = ApiFactory;
