const apiReqNames = require('./apiReqNames');

const HOST = 'https://uat-api.synapsefi.com';
const VERSION = 'v3.1';

module.exports = {
  //
  // USERS ------------------------------------------------------------------
  [apiReqNames.GET_USERS]: `/${VERSION}/users`,
  [apiReqNames.POST_CREATE_USER]: `/${VERSION}/users`,
  [apiReqNames.GET_USER]: `/${VERSION}/users/:user_id`,
  [apiReqNames.PATCH_ADD_DOCUMENTS]: `/${VERSION}/users/:user_id`,
  [apiReqNames.PATCH_UPDATE_EXISTING_DOCUMENT]: `/${VERSION}/users/:user_id`,
  [apiReqNames.PATCH_DELETE_EXSITING_BASE_DOC]: `/${VERSION}/users/:user_id`,
  [apiReqNames.PATCH_DELETE_EXSITING_SUB_DOCS]: `/${VERSION}/users/:user_id`,
  [apiReqNames.PATCH_UPDATE_USER]: `/${VERSION}/users/:user_id`,
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
