const axios = require('axios');

const {
  POST_CREATE_TRANSACTION,
  GET_TRANSACTION,
  PATCH_COMMENT_ON_STATUS,
  DELETE_TRANSACTION,
  GET_ALL_CLIENT_TRANSACTIONSS,
  GET_ALL_USER_TRANSACTIONS,
  GET_ALL_NODE_TRANSACTIONS,
} = require('../constants/apiReqNames');

const staticEndpoints = require('../constants/staticEndpoints');
const buildHeaders = require('../helpers/buildHeaders');
const { addQueryParams, replacePathParams } = require('../helpers/urlBuilders');

module.exports[POST_CREATE_TRANSACTION] = ({ node_id, reqBody, userInfo }) => {
  const { oauth_key, host, user_id, fingerprint, ip_address } = userInfo;

  return axios.post(
    replacePathParams({
      originalUrl: `${host}${staticEndpoints[POST_CREATE_TRANSACTION]}`,
      user_id,
      node_id,
    }),
    reqBody,
    buildHeaders({
      fingerprint,
      ip_address,
      oauth_key,
    })
  );
};
