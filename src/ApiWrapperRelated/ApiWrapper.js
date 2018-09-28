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
  GET_NODE_TYPES,
  GET_ALL_CLIENT_NODES,
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
  POST_CREATE_TRANSACTION,
  GET_TRANSACTION,
  PATCH_COMMENT_ON_STATUS,
  DELETE_TRANSACTION,
  GET_ALL_CLIENT_TRANSACTIONS,
  GET_ALL_USER_TRANSACTIONS,
  GET_ALL_NODE_TRANSACTIONS,
  // ---------------------------------
  //
} = require('../constants/apiReqNames');
const apiRequests = require('../apiReqs/apiRequests');

class ApiWrapper {
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

  GET_ALL_CLIENT_USERS(queryParams = {}) {
    const { mongoQuery, query, page, per_page, show_refresh_tokens } = queryParams;

    return apiRequests.users[GET_ALL_CLIENT_USERS]({
      mongoQuery,
      query,
      page,
      per_page,
      show_refresh_tokens,
      userInfo: this,
    });
  }

  POST_CREATE_USER({ logins, phone_numbers, legal_names, optionalBodyParams }) {
    return apiRequests.users[POST_CREATE_USER]({
      logins,
      phone_numbers,
      legal_names,
      optionalBodyParams,
      userInfo: this,
    });
  }

  GET_USER() {
    return apiRequests.users[GET_USER]({ userInfo: this }).then(({ data }) => {
      this.refresh_token = data.refresh_token;
      return { data };
    });
  }

  PATCH_ADD_DOCUMENT({ bodyParams, documentObj }) {
    return apiRequests.users[PATCH_ADD_DOCUMENT]({
      bodyParams,
      documentObj,
      userInfo: this,
    });
  }

  PATCH_UPDATE_DOCUMENT({ bodyParams, documentObj }) {
    return apiRequests.users[PATCH_UPDATE_DOCUMENT]({
      bodyParams,
      documentObj,
      userInfo: this,
    });
  }

  PATCH_DELETE_BASE_DOC({ bodyParams, documentId }) {
    return apiRequests.users[PATCH_DELETE_BASE_DOC]({
      bodyParams,
      documentId,
      userInfo: this,
    });
  }

  PATCH_DELETE_SUB_DOCS({ bodyParams, baseDocId, physicalDocIds, socialDocIds, virtualDocIds }) {
    return apiRequests.users[PATCH_DELETE_SUB_DOCS]({
      bodyParams,
      baseDocId,
      physicalDocIds,
      socialDocIds,
      virtualDocIds,
      userInfo: this,
    });
  }

  PATCH_UPDATE_USER({ bodyParams, updateObj }) {
    return apiRequests.users[PATCH_UPDATE_USER]({
      bodyParams,
      updateObj,
      userInfo: this,
    });
  }

  PATCH_USER_PERMISSION({ bodyParams, permission }) {
    return apiRequests.users[PATCH_USER_PERMISSION]({
      bodyParams,
      permission,
      userInfo: this,
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

  GET_NODE_TYPES() {
    return apiRequests.nodes[GET_NODE_TYPES]({ host: this.host });
  }

  GET_ALL_CLIENT_NODES(queryParams = {}) {
    const { mongoQuery, query, page, per_page, type } = queryParams;
    return apiRequests.nodes[GET_ALL_CLIENT_NODES]({
      mongoQuery,
      query,
      page,
      per_page,
      type,
      userInfo: this,
    });
  }

  POST_CREATE_NODE({ bodyParams }) {
    return apiRequests.nodes[POST_CREATE_NODE]({
      bodyParams,
      userInfo: this,
    });
  }

  GET_ALL_USER_NODES(queryParams) {
    // queryParams =
    // {
    //   page:
    //   per_page:
    //   type:
    // }
    return apiRequests.nodes[GET_ALL_USER_NODES]({
      page: queryParams ? queryParams.page : undefined,
      per_page: queryParams ? queryParams.per_page : undefined,
      type: queryParams ? queryParams.type : undefined,
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

  PATCH_UPDATE_NODE({ node_id, bodyParams }) {
    return apiRequests.nodes[PATCH_UPDATE_NODE]({
      node_id,
      bodyParams,
      userInfo: this,
    });
  }

  // * PATCH_REISSUE_DEBIT_CARD
  // * PATCH_REORDER_DEBIT_CARD
  POST_ACH_WITH_AC_RN({ bodyParams }) {
    return apiRequests.nodes[POST_ACH_WITH_AC_RN]({
      bodyParams,
      userInfo: this,
    });
  }

  PATCH_REINITIATE_MICRO_DEPOSIT({ node_id }) {
    return apiRequests.nodes[PATCH_REINITIATE_MICRO_DEPOSIT]({
      node_id,
      userInfo: this,
    });
  }

  PATCH_VERIFY_MICRO_DEPOSIT({ node_id, micro }) {
    return apiRequests.nodes[PATCH_VERIFY_MICRO_DEPOSIT]({
      node_id,
      micro,
      userInfo: this,
    });
  }

  // ------------------------------------------------------------------------
  //
  //
  //
  // TRANSACTION  ------------------------------------------------------------------
  POST_CREATE_TRANSACTION({
    from_node_id,
    to_node_id,
    to_node_type,
    amount,
    currency,
    optionalBodyParams,
  }) {
    return apiRequests.transactions[POST_CREATE_TRANSACTION]({
      from_node_id,
      to_node_id,
      to_node_type,
      amount,
      currency,
      optionalBodyParams,
      userInfo: this,
    });
  }

  GET_TRANSACTION({ node_id, trans_id }) {
    return apiRequests.transactions[GET_TRANSACTION]({
      node_id,
      trans_id,
      userInfo: this,
    });
  }

  PATCH_COMMENT_ON_STATUS({ node_id, trans_id, comment }) {
    return apiRequests.transactions[PATCH_COMMENT_ON_STATUS]({
      node_id,
      trans_id,
      comment,
      userInfo: this,
    });
  }

  DELETE_TRANSACTION({ node_id, trans_id }) {
    return apiRequests.transactions[DELETE_TRANSACTION]({
      node_id,
      trans_id,
      userInfo: this,
    });
  }

  GET_ALL_CLIENT_TRANSACTIONS(queryParams = {}) {
    const { mongoQuery, query, page, per_page } = queryParams;
    return apiRequests.transactions[GET_ALL_CLIENT_TRANSACTIONS]({
      mongoQuery,
      query,
      page,
      per_page,
      userInfo: this,
    });
  }

  GET_ALL_USER_TRANSACTIONS(queryParams = {}) {
    const { query, page, per_page } = queryParams;
    return apiRequests.transactions[GET_ALL_USER_TRANSACTIONS]({
      query,
      page,
      per_page,
      userInfo: this,
    });
  }

  GET_ALL_NODE_TRANSACTIONS(queryParams = {}) {
    const { node_id, query, page, per_page } = queryParams;
    return apiRequests.transactions[GET_ALL_NODE_TRANSACTIONS]({
      node_id,
      query,
      page,
      per_page,
      userInfo: this,
    });
  }
  // -------------------------------------------------------------------------------
  //
}

module.exports = ApiWrapper;
