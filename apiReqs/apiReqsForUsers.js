const axios = require('axios');

const {
  GET_USERS,
  POST_CREATE_USER,
  GET_USER,
  PATCH_ADD_DOCUMENTS,
} = require('../constants/apiReqNames');
const staticEndpoints = require('../constants/staticEndpoints');
const buildHeaders = require('../helpers/buildHeaders');
const { addQueryParams, replacePathParams } = require('../helpers/urlBuilders');

module.exports[GET_USERS] = ({
  host,
  client_id,
  client_secret,
  fingerprint,
  query,
  page,
  per_page,
  show_refresh_tokens,
}) => {
  return buildHeaders({
    client_id,
    client_secret,
    fingerprint,
  }).then(config => {
    return axios.get(
      addQueryParams({
        originalUrl: `${host}${staticEndpoints[GET_USERS]}`,
        query,
        page,
        per_page,
        show_refresh_tokens,
      }),
      config
    );
  });
};

module.exports[POST_CREATE_USER] = ({ reqBody, host, client_id, client_secret, fingerprint }) => {
  return buildHeaders({
    client_id,
    client_secret,
    fingerprint,
  }).then(config => {
    return axios.post(`${host}${staticEndpoints[POST_CREATE_USER]}`, reqBody, config);
  });
};

module.exports[GET_USER] = ({ host, client_id, client_secret, fingerprint, user_id }) => {
  const queryAddedUrl = addQueryParams({
    originalUrl: `${host}${staticEndpoints[GET_USER]}`,
    full_dehydrate: 'yes',
  });

  return buildHeaders({
    client_id,
    client_secret,
    fingerprint,
  }).then(config => {
    return axios.get(replacePathParams({ originalUrl: queryAddedUrl, user_id }), config);
  });
};

module.exports[PATCH_ADD_DOCUMENTS] = ({
  user_id,
  documentObj,

  host,
  oauth_key,
  client_id,
  client_secret,
  fingerprint,
}) => {
  const queryAddedUrl = addQueryParams({
    originalUrl: `${host}${staticEndpoints[PATCH_ADD_DOCUMENTS]}`,
  });

  const reqBody = { documents: [documentObj] };

  return buildHeaders({
    client_id,
    client_secret,
    oauth_key,
    fingerprint,
  }).then(config => {
    return axios.patch(replacePathParams({ originalUrl: queryAddedUrl, user_id }), reqBody, config);
  });
};
