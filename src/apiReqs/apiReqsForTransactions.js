const axios = require('axios');

const {
  POST_CREATE_TRANSACTION,
  GET_TRANSACTION,
  PATCH_COMMENT_ON_STATUS,
  DELETE_TRANSACTION,
  GET_ALL_CLIENT_TRANSACTIONS,
  GET_ALL_USER_TRANSACTIONS,
  GET_ALL_NODE_TRANSACTIONS,
} = require('../constants/apiReqNames');

const staticEndpoints = require('../constants/staticEndpoints');
const buildHeaders = require('../helpers/buildHeaders');
const { addQueryParams, replacePathParams } = require('../helpers/urlBuilders');

module.exports[POST_CREATE_TRANSACTION] = ({
  from_node_id,
  to_node_id,
  to_node_type,
  amount,
  currency,
  optionalBodyParams,
  userInfo,
}) => {
  const { oauth_key, host, user_id, fingerprint, ip_address } = userInfo;

  let extra = {};
  if (optionalBodyParams !== undefined) {
    if (optionalBodyParams.extra !== undefined) {
      extra = optionalBodyParams.extra;
    }
  }

  return axios.post(
    replacePathParams({
      originalUrl: `${host}${staticEndpoints[POST_CREATE_TRANSACTION]}`,
      user_id,
      node_id: from_node_id,
    }),
    {
      to: {
        type: to_node_type,
        id: to_node_id,
      },
      amount: {
        amount,
        currency,
      },
      extra: {
        ip: ip_address,
        ...extra,
      },
    },
    {
      headers: buildHeaders({
        fingerprint,
        ip_address,
        oauth_key,
      }),
    }
  );
};

module.exports[GET_TRANSACTION] = ({ node_id, trans_id, userInfo }) => {
  const { oauth_key, host, user_id, fingerprint, ip_address } = userInfo;

  return axios.get(
    replacePathParams({
      originalUrl: `${host}${staticEndpoints[GET_TRANSACTION]}`,
      user_id,
      node_id,
      trans_id,
    }),
    {
      headers: buildHeaders({
        fingerprint,
        ip_address,
        oauth_key,
      }),
    }
  );
};

module.exports[PATCH_COMMENT_ON_STATUS] = ({ node_id, trans_id, comment, userInfo }) => {
  const { oauth_key, host, user_id, fingerprint, ip_address } = userInfo;

  return axios.patch(
    replacePathParams({
      originalUrl: `${host}${staticEndpoints[PATCH_COMMENT_ON_STATUS]}`,
      user_id,
      node_id,
      trans_id,
    }),
    { comment },
    {
      headers: buildHeaders({
        fingerprint,
        ip_address,
        oauth_key,
      }),
    }
  );
};

module.exports[DELETE_TRANSACTION] = ({ node_id, trans_id, userInfo }) => {
  const { oauth_key, host, user_id, fingerprint, ip_address } = userInfo;

  return axios.delete(
    replacePathParams({
      originalUrl: `${host}${staticEndpoints[DELETE_TRANSACTION]}`,
      user_id,
      node_id,
      trans_id,
    }),
    {
      headers: buildHeaders({
        fingerprint,
        ip_address,
        oauth_key,
      }),
    }
  );
};

module.exports[GET_ALL_CLIENT_TRANSACTIONS] = ({ mongoQuery, query, page, per_page, userInfo }) => {
  const { oauth_key, host, fingerprint, ip_address, client_id, client_secret } = userInfo;

  return axios.get(
    addQueryParams({
      originalUrl: `${host}${staticEndpoints[GET_ALL_CLIENT_TRANSACTIONS]}`,
      mongoQuery,
      query,
      page,
      per_page,
    }),
    {
      headers: buildHeaders({
        client_id,
        client_secret,
        fingerprint,
        ip_address,
        oauth_key,
      }),
    }
  );
};

module.exports[GET_ALL_USER_TRANSACTIONS] = ({ query, page, per_page, userInfo }) => {
  const { oauth_key, host, fingerprint, ip_address, user_id } = userInfo;

  const url = addQueryParams({
    originalUrl: `${host}${staticEndpoints[GET_ALL_USER_TRANSACTIONS]}`,
    query,
    page,
    per_page,
  });

  return axios.get(
    replacePathParams({
      originalUrl: url,
      user_id,
    }),
    {
      headers: buildHeaders({
        fingerprint,
        ip_address,
        oauth_key,
      }),
    }
  );
};

module.exports[GET_ALL_NODE_TRANSACTIONS] = ({
  node_id,
  query,
  page,
  per_page,
  mongoQuery,
  userInfo,
}) => {
  const { oauth_key, host, fingerprint, ip_address, user_id } = userInfo;

  const url = addQueryParams({
    originalUrl: `${host}${staticEndpoints[GET_ALL_NODE_TRANSACTIONS]}`,
    query,
    page,
    per_page,
    mongoQuery,
  });

  return axios.get(
    replacePathParams({
      originalUrl: url,
      user_id,
      node_id,
    }),
    {
      headers: buildHeaders({
        fingerprint,
        ip_address,
        oauth_key,
      }),
    }
  );
};
