const axios = require('axios');

const { POST_CREATE_NODE, GET_ALL_USER_NODES, DELETE_NODE } = require('../constants/apiReqNames');

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

module.exports[GET_ALL_USER_NODES] = ({
  host,
  fingerprint,
  user_id,
  ip_address,
  oauth_key,
  page,
  per_page,
  type,
}) => {
  const queryAddedUrl = addQueryParams({
    originalUrl: `${host}${staticEndpoints[GET_ALL_USER_NODES]}`,
    page,
    per_page,
    type,
  });

  return axios.get(
    replacePathParams({
      originalUrl: queryAddedUrl,
      user_id,
    }),
    buildHeaders({
      fingerprint,
      ip_address,
      oauth_key,
    })
  );
};

module.exports[DELETE_NODE] = ({ node_id, host, fingerprint, user_id, ip_address, oauth_key }) => {
  return axios.delete(
    replacePathParams({
      originalUrl: `${host}${staticEndpoints[DELETE_NODE]}`,
      user_id,
      node_id,
    }),
    buildHeaders({
      fingerprint,
      ip_address,
      oauth_key,
    })
  );
};
