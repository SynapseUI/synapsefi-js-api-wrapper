const apiReqNames = require('./apiReqNames');

const HOST = 'https://uat-api.synapsefi.com';

const VERSION = 'v3.1';

const USERS = `/${VERSION}/users`;
const USERS__USER_ID = `/${VERSION}/users/:user_id`;

module.exports = {
  //
  // USERS ------------------------------------------------------------------
  [apiReqNames.GET_USERS_DOCUMENT_TYPES]: `${USERS}/document-types`,
  [apiReqNames.GET_USERS_ENTITY_TYPES]: `${USERS}/entity-types`,
  [apiReqNames.GET_USERS_ENTITY_SCOPES]: `${USERS}/entity-scopes`,
  [apiReqNames.GET_USERS]: USERS,
  [apiReqNames.POST_CREATE_USER]: USERS,
  [apiReqNames.GET_USER]: USERS__USER_ID,
  [apiReqNames.PATCH_ADD_DOCUMENTS]: USERS__USER_ID,
  [apiReqNames.PATCH_UPDATE_EXISTING_DOCUMENT]: USERS__USER_ID,
  [apiReqNames.PATCH_DELETE_EXSITING_BASE_DOC]: USERS__USER_ID,
  [apiReqNames.PATCH_DELETE_EXSITING_SUB_DOCS]: USERS__USER_ID,
  [apiReqNames.PATCH_UPDATE_USER]: USERS__USER_ID,
  [apiReqNames.PATCH_DELETE_USER]: USERS__USER_ID,
  // ------------------------------------------------------------------------
  //
  // NODES  ////////////////////////////////////////////////////////////////////////
  //
  // ///////////////////////////////////////////////////////////////////////////////
  //
  // TRANSACTION  ------------------------------------------------------------------
  //
  // -------------------------------------------------------------------------------
  //
};
