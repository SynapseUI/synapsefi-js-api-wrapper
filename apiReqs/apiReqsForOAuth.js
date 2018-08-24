const axios = require('axios');

const { POST_OAUTH_USER } = require('../constants/apiReqNames');

const staticEndpoints = require('../constants/staticEndpoints');
const buildHeaders = require('../helpers/buildHeaders');
const { replacePathParams } = require('../helpers/urlBuilders');

module.exports[POST_OAUTH_USER] = ({
  refresh_token,
  user_id,
  host,
  client_id,
  client_secret,
  fingerprint,
}) => {
  return axios.post(
    replacePathParams({
      originalUrl: `${host}${staticEndpoints[POST_OAUTH_USER]}`,
      user_id,
    }),
    { refresh_token },
    buildHeaders({
      client_id,
      client_secret,
      fingerprint,
    })
  );
};
