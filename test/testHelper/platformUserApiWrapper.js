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

const ApiFactory = require('../../src/ApiFactoryRelated/ApiFactory');

const platformUserApiWrapper = new ApiFactory({
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
