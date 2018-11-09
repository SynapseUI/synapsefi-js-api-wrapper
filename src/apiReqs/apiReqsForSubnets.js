const axios = require('axios');

const {
  POST_CREATE_SUBNET,
  GET_SUBNET,
  GET_SUBNETS,
  PATCH_SUBNET,
} = require('../constants/apiReqNames');

const staticEndpoints = require('../constants/staticEndpoints');
const { replacePathParams } = require('../helpers/urlBuilders');

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

module.exports[GET_SUBNET] = ({ node_id, subnet_id, userInfo }) => {
  const { host, user_id, headers } = userInfo;

  return axios.get(
    replacePathParams({
      originalUrl: `${host}${staticEndpoints[GET_SUBNET]}`,
      user_id,
      node_id,
      subnet_id,
    }),
    { headers }
  );
};

module.exports[GET_SUBNETS] = ({ node_id, userInfo }) => {
  const { host, user_id, headers } = userInfo;

  return axios.get(
    replacePathParams({
      originalUrl: `${host}${staticEndpoints[GET_SUBNETS]}`,
      user_id,
      node_id,
    }),
    { headers }
  );
};

module.exports[PATCH_SUBNET] = ({ node_id, subnet_id, status, userInfo }) => {
  const { host, user_id, headers } = userInfo;

  return axios.patch(
    replacePathParams({
      originalUrl: `${host}${staticEndpoints[PATCH_SUBNET]}`,
      user_id,
      node_id,
      subnet_id,
    }),
    { status },
    { headers }
  );
};
