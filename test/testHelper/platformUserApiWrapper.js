const {
  host,
  client_id,
  client_secret,
  oauth_key,
  fingerprint,
  user_id,
  refresh_token,
  ip_address,
} = require('../../src/config/keys');

const ApiWrapper = require('../../src/ApiWrapperRelated/ApiWrapper');

const platformUserApiWrapper = new ApiWrapper({
  host,
  client_id,
  client_secret,
  oauth_key,
  fingerprint,
  user_id,
  refresh_token,
  ip_address,
});

module.exports = platformUserApiWrapper;
