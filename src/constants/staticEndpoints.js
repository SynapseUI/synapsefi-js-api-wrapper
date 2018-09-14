const apiReqNames = require('./apiReqNames');

// const HOST = 'https://uat-api.synapsefi.com';

const VERSION = 'v3.1';

const USERS = 'users';

const USER_ID = ':user_id';

const fullEndpointForUserId = `/${VERSION}/${USERS}/${USER_ID}`;

module.exports = {
  //
  // USERS ------------------------------------------------------------------
  [apiReqNames.GET_USERS_DOCUMENT_TYPES]: `/${VERSION}/${USERS}/document-types`,
  [apiReqNames.GET_USERS_ENTITY_TYPES]: `/${VERSION}/${USERS}/entity-types`,
  [apiReqNames.GET_USERS_ENTITY_SCOPES]: `/${VERSION}/${USERS}/entity-scopes`,
  [apiReqNames.GET_ALL_CLIENT_USERS]: `/${VERSION}/${USERS}`,
  [apiReqNames.POST_CREATE_USER]: `/${VERSION}/${USERS}`,
  [apiReqNames.GET_USER]: fullEndpointForUserId,
  [apiReqNames.PATCH_ADD_DOCUMENT]: fullEndpointForUserId + '?full_dehydrate=yes',
  [apiReqNames.PATCH_UPDATE_DOCUMENT]: fullEndpointForUserId + '?full_dehydrate=yes',
  [apiReqNames.PATCH_DELETE_BASE_DOC]: fullEndpointForUserId,
  [apiReqNames.PATCH_DELETE_SUB_DOCS]: fullEndpointForUserId,
  [apiReqNames.PATCH_UPDATE_USER]: fullEndpointForUserId,
  [apiReqNames.PATCH_USER_PERMISSION]: fullEndpointForUserId,
  // ------------------------------------------------------------------------
  //
  // OAUTH  -----------------------------------------------------------------
  [apiReqNames.POST_OAUTH_USER]: `/${VERSION}/oauth/:user_id`,
  // ------------------------------------------------------------------------
  //
  // NODES  ////////////////////////////////////////////////////////////////////////
  [apiReqNames.GET_ALL_USER_NODES]: `/${VERSION}/users/:user_id/nodes`,
  [apiReqNames.GET_NODE]: `/${VERSION}/users/:user_id/nodes?full_dehydrate=yes&force_refresh=yes`,
  [apiReqNames.POST_CREATE_NODE]: `/${VERSION}/users/:user_id/nodes`,
  [apiReqNames.DELETE_NODE]: `/${VERSION}/users/:user_id/nodes/:node_id`,
  [apiReqNames.POST_ACH_WITH_LOGIN]: `/${VERSION}/users/:user_id/nodes`,
  [apiReqNames.POST_ACH_WITH_MFA]: `/${VERSION}/users/:user_id/nodes`,
  [apiReqNames.PATCH_UPDATE_NODE]: `/${VERSION}/users/:user_id/nodes/:node_id`,
  [apiReqNames.PATCH_REISSUE_DEBIT_CARD]: `/${VERSION}/users/:user_id/nodes/:node_id?reissue_card=YES`,
  [apiReqNames.PATCH_REORDER_DEBIT_CARD]: `/${VERSION}/users/:user_id/nodes/:node_id?reorder_card=YES`,
  [apiReqNames.POST_ACH_WITH_AC_RN]: `/${VERSION}/users/:user_id/nodes`,
  [apiReqNames.PATCH_REINITIATE_MICRO_DEPOSIT]: `/${VERSION}/users/:user_id/nodes/:node_id?resend_micro=YES`,
  [apiReqNames.PATCH_VERIFY_MICRO_DEPOSIT]: `/${VERSION}/users/:user_id/nodes/:node_id?`,

  // ///////////////////////////////////////////////////////////////////////////////
  //
  // TRANSACTION  ------------------------------------------------------------------
  //
  // -------------------------------------------------------------------------------
  //
};
