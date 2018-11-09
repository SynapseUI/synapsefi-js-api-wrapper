const axios = require('axios');

const { POST_OAUTH_USER } = require('../constants/apiReqNames');

const staticEndpoints = require('../constants/staticEndpoints');
const { replacePathParams } = require('../helpers/urlBuilders');

module.exports[POST_OAUTH_USER] = ({ bodyParams, userInfo }) => {
  const { user_id, host, refresh_token, headers } = userInfo;

  const reqBody = bodyParams !== undefined ? bodyParams : { refresh_token };

  return axios.post(
    replacePathParams({
      originalUrl: `${host}${staticEndpoints[POST_OAUTH_USER]}`,
      user_id,
    }),
    reqBody,
    { headers }
  );
};
