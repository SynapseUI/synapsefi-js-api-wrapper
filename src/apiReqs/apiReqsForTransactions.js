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
const { addQueryParams, replacePathParams } = require('../helpers/urlBuilders');

module.exports[POST_CREATE_TRANSACTION] = ({
  from_node_id,
  to_node_id,
  to_node_type,
  amount,
  currency,
  bodyParams,
  userInfo,
}) => {
  const { host, user_id, ip_address, headers } = userInfo;

  const reqBody = bodyParams || {
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
    },
  };

  return axios.post(
    replacePathParams({
      originalUrl: `${host}${staticEndpoints[POST_CREATE_TRANSACTION]}`,
      user_id,
      node_id: from_node_id,
    }),
    reqBody,
    { headers }
  );
};

module.exports[GET_TRANSACTION] = ({ node_id, trans_id, userInfo }) => {
  const { host, user_id, headers } = userInfo;

  return axios.get(
    replacePathParams({
      originalUrl: `${host}${staticEndpoints[GET_TRANSACTION]}`,
      user_id,
      node_id,
      trans_id,
    }),
    { headers }
  );
};

module.exports[PATCH_COMMENT_ON_STATUS] = ({
  node_id,
  trans_id,
  comment,
  bodyParams,
  userInfo,
}) => {
  const { host, user_id, headers } = userInfo;

  const reqBody = bodyParams || { comment };

  return axios.patch(
    replacePathParams({
      originalUrl: `${host}${staticEndpoints[PATCH_COMMENT_ON_STATUS]}`,
      user_id,
      node_id,
      trans_id,
    }),
    reqBody,
    { headers }
  );
};

module.exports[DELETE_TRANSACTION] = ({ node_id, trans_id, userInfo }) => {
  const { host, user_id, headers } = userInfo;

  return axios.delete(
    replacePathParams({
      originalUrl: `${host}${staticEndpoints[DELETE_TRANSACTION]}`,
      user_id,
      node_id,
      trans_id,
    }),
    { headers }
  );
};

module.exports[GET_ALL_CLIENT_TRANSACTIONS] = ({ mongoQuery, query, page, per_page, userInfo }) => {
  const { host, headers } = userInfo;

  return axios.get(
    addQueryParams({
      originalUrl: `${host}${staticEndpoints[GET_ALL_CLIENT_TRANSACTIONS]}`,
      mongoQuery,
      query,
      page,
      per_page,
    }),
    { headers }
  );
};

module.exports[GET_ALL_USER_TRANSACTIONS] = ({ query, page, per_page, mongoQuery, userInfo }) => {
  const { host, user_id, headers } = userInfo;

  const url = addQueryParams({
    originalUrl: `${host}${staticEndpoints[GET_ALL_USER_TRANSACTIONS]}`,
    query,
    page,
    per_page,
    mongoQuery,
  });

  return axios.get(
    replacePathParams({
      originalUrl: url,
      user_id,
    }),
    { headers }
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
  const { host, user_id, headers } = userInfo;

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
    { headers }
  );
};
