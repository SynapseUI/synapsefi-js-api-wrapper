const axios = require('axios');

const {
  POST_CREATE_SUBNET,
  GET_SUBNET,
  GET_SUBNETS,
  PATCH_SUBNET,
} = require('../constants/apiReqNames');

const staticEndpoints = require('../constants/staticEndpoints');
const buildHeaders = require('../helpers/buildHeaders');
const { addQueryParams, replacePathParams } = require('../helpers/urlBuilders');
const addDeleteDocument = require('../helpers/addDeleteDocument');

module.exports[POST_CREATE_SUBNET] = ({ node_id, nickname, userInfo }) => {
  const { host, user_id, headers } = userInfo;

  return axios.post(
    replacePathParams({
      originalUrl: `${host}${staticEndpoints[POST_CREATE_SUBNET]}`,
      user_id,
      node_id,
    }),
    { nickname },
    { headers }
  );
};
