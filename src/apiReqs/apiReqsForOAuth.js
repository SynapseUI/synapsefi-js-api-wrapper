const axios = require('axios');

const { POST_OAUTH_USER } = require('../constants/apiReqNames');

const staticEndpoints = require('../constants/staticEndpoints');
const buildHeaders = require('../helpers/buildHeaders');
const { replacePathParams } = require('../helpers/urlBuilders');

module.exports[POST_OAUTH_USER] = ({ bodyParams, userInfo }) => {
  const { user_id, host, client_id, client_secret, fingerprint, refresh_token } = userInfo;

  const reqBody = bodyParams !== undefined ? bodyParams : { refresh_token };

  return axios.post(
    replacePathParams({
      originalUrl: `${host}${staticEndpoints[POST_OAUTH_USER]}`,
      user_id,
    }),
    reqBody,
    {
      headers: buildHeaders({
        client_id,
        client_secret,
        fingerprint,
      }),
    }
  );
};
