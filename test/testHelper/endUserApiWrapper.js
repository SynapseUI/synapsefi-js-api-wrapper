const platformUserApiWrapper = require('./platformUserApiWrapper');
const ApiWrapper = require('../../src/ApiWrapperRelated/ApiWrapper');

const endUserApiWrapper = new ApiWrapper({
  host: platformUserApiWrapper.host,
  client_id: platformUserApiWrapper.client_id,
  client_secret: platformUserApiWrapper.client_secret,
  oauth_key: '',
  fingerprint: platformUserApiWrapper.fingerprint,
  user_id: '',
  refresh_token: '',
  ip_address: platformUserApiWrapper.ip_address,
});

module.exports = endUserApiWrapper;
