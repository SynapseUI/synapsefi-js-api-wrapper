const axios = require('axios');

const { POST_CREATE_NODE } = require('../constants/apiReqNames');

const staticEndpoints = require('../constants/staticEndpoints');
const buildHeaders = require('../helpers/buildHeaders');
const { addQueryParams, replacePathParams } = require('../helpers/urlBuilders');

module.exports[POST_CREATE_NODE] = ({
  reqBody,
  host,
  fingerprint,
  user_id,
  ip_address,
  oauth_key,
}) => {
  console.log(
    replacePathParams({
      originalUrl: `${host}${staticEndpoints[POST_CREATE_NODE]}`,
      user_id,
    })
  );

  console.log(reqBody);

  console.log(
    buildHeaders({
      fingerprint,
      ip_address,
      oauth_key,
    })
  );

  return axios.post(
    replacePathParams({
      originalUrl: `${host}${staticEndpoints[POST_CREATE_NODE]}`,
      user_id,
    }),
    reqBody,
    buildHeaders({
      fingerprint,
      ip_address,
      oauth_key,
    })
  );
};
