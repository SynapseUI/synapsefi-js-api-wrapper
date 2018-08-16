const apiKeys = require('./apiKeys');

const HOST = 'https://uat-api.synapsefi.com';

export default {
  // User
  [apiKeys.GET_USERS]: '/v3.1/users',
  [apiKeys.POST_CREATE_USER]: '/v3.1/users',
  [apiKeys.GET_USER]: '/v3.1/users/:user_id',
  [apiKeys.PATCH_ADD_DOCUMENTS]: '/v3.1/users/:user_id',
  [apiKeys.PATCH_UPDATE_EXISTING_DOCUMENT]: '/v3.1/users/:user_id',
  [apiKeys.PATCH_DELETE_EXISTING_DOCUMENT]: '/v3.1/users/:user_id',
  [apiKeys.PATCH_UPDATE_USER]: '/v3.1/users/:user_id',
};
