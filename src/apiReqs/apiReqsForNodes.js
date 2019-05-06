const axios = require('axios');

const {
  GET_NODE_TYPES,
  GET_ALL_CLIENT_NODES,
  GET_ALL_USER_NODES,
  GET_NODE,
  POST_CREATE_NODE,
  DELETE_NODE,
  POST_ACH_WITH_LOGIN,
  POST_ACH_WITH_MFA,
  PATCH_UPDATE_NODE,
  PATCH_REISSUE_DEBIT_CARD,
  PATCH_REORDER_DEBIT_CARD,
  POST_ACH_WITH_AC_RN,
  PATCH_REINITIATE_MICRO_DEPOSIT,
  PATCH_VERIFY_MICRO_DEPOSIT,
} = require('../constants/apiReqNames');

const staticEndpoints = require('../constants/staticEndpoints');
const buildHeaders = require('../helpers/buildHeaders');
const { addQueryParams, replacePathParams } = require('../helpers/urlBuilders');

module.exports[GET_NODE_TYPES] = ({ host }) => {
  return axios.get(`${host}${staticEndpoints[GET_NODE_TYPES]}`);
};

module.exports[POST_CREATE_NODE] = ({ bodyParams, userInfo }) => {
  const { oauth_key, host, user_id, fingerprint, ip_address } = userInfo;

  return axios.post(
    replacePathParams({
      originalUrl: `${host}${staticEndpoints[POST_CREATE_NODE]}`,
      user_id,
    }),
    bodyParams,
    {
      headers: buildHeaders({
        fingerprint,
        ip_address,
        oauth_key,
      }),
    }
  );
};

module.exports[GET_ALL_CLIENT_NODES] = ({ mongoQuery, query, page, per_page, type, params, userInfo }) => {
  const { oauth_key, host, fingerprint, ip_address, client_id, client_secret } = userInfo;

  const queryAddedUrl = addQueryParams({
    originalUrl: `${host}${staticEndpoints[GET_ALL_CLIENT_NODES]}`,
    mongoQuery,
    page,
    per_page,
    type,
    query,
  });

  return axios.get(
    replacePathParams({
      originalUrl: queryAddedUrl,
    }),
    {
      headers: buildHeaders({
        fingerprint,
        ip_address,
        oauth_key,
        client_id,
        client_secret,
      }),
      ...(params !== 'undefined' && { params })
    }
  );
};

module.exports[GET_ALL_USER_NODES] = ({ page, per_page, type, mongoQuery, params, userInfo }) => {
  const { oauth_key, host, user_id, fingerprint, ip_address } = userInfo;

  const queryAddedUrl = addQueryParams({
    originalUrl: `${host}${staticEndpoints[GET_ALL_USER_NODES]}`,
    page,
    per_page,
    type,
    mongoQuery,
  });

  return axios.get(
    replacePathParams({
      originalUrl: queryAddedUrl,
      user_id,
    }),
    {
      headers: buildHeaders({
        fingerprint,
        ip_address,
        oauth_key,
      }),
      ...(params !== 'undefined' && { params })
    }
  );
};

module.exports[DELETE_NODE] = ({ node_id, userInfo }) => {
  const { oauth_key, host, user_id, fingerprint, ip_address } = userInfo;

  return axios.delete(
    replacePathParams({
      originalUrl: `${host}${staticEndpoints[DELETE_NODE]}`,
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

module.exports[GET_NODE] = ({ node_id, userInfo }) => {
  const { oauth_key, host, user_id, fingerprint, ip_address } = userInfo;

  return axios.get(
    replacePathParams({
      originalUrl: `${host}${staticEndpoints[GET_NODE]}`,
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

module.exports[POST_ACH_WITH_LOGIN] = ({ bank_id, bank_pw, bank_name, userInfo }) => {
  const { oauth_key, host, user_id, fingerprint, ip_address } = userInfo;

  return axios.post(
    replacePathParams({
      originalUrl: `${host}${staticEndpoints[POST_ACH_WITH_LOGIN]}`,
      user_id,
    }),
    {
      type: 'ACH-US',
      info: { bank_id, bank_pw, bank_name },
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

module.exports[POST_ACH_WITH_MFA] = ({ access_token, mfa_answer, userInfo }) => {
  const { oauth_key, host, user_id, fingerprint, ip_address } = userInfo;

  return axios.post(
    replacePathParams({
      originalUrl: `${host}${staticEndpoints[POST_ACH_WITH_MFA]}`,
      user_id,
    }),
    {
      access_token,
      mfa_answer,
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

module.exports[PATCH_UPDATE_NODE] = ({ node_id, bodyParams, queryParams, userInfo }) => {
  const { oauth_key, host, user_id, fingerprint, ip_address } = userInfo;

  return axios.patch(
    replacePathParams({
      originalUrl: `${host}${staticEndpoints[PATCH_UPDATE_NODE]}`,
      user_id,
      node_id,
    }),
    bodyParams,
    {
      headers: buildHeaders({
        fingerprint,
        ip_address,
        oauth_key,
      }),
      params: {
        ...queryParams,
      },
    }
  );
};

// * PATCH_REISSUE_DEBIT_CARD
// * PATCH_REORDER_DEBIT_CARD

module.exports[POST_ACH_WITH_AC_RN] = ({ bodyParams, userInfo }) => {
  const { oauth_key, host, user_id, fingerprint, ip_address } = userInfo;

  return axios.post(
    replacePathParams({
      originalUrl: `${host}${staticEndpoints[POST_ACH_WITH_AC_RN]}`,
      user_id,
    }),
    {
      ...bodyParams,
      type: 'ACH-US',
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

module.exports[PATCH_REINITIATE_MICRO_DEPOSIT] = ({ node_id, userInfo }) => {
  const { oauth_key, host, user_id, fingerprint, ip_address } = userInfo;

  const res = replacePathParams({
    originalUrl: `${host}${staticEndpoints[PATCH_REINITIATE_MICRO_DEPOSIT]}`,
    user_id,
    node_id,
  });

  return axios.patch(
    replacePathParams({
      originalUrl: `${host}${staticEndpoints[PATCH_REINITIATE_MICRO_DEPOSIT]}`,
      user_id,
      node_id,
    }),
    {},
    {
      headers: buildHeaders({
        fingerprint,
        ip_address,
        oauth_key,
      }),
    }
  );
};

module.exports[PATCH_VERIFY_MICRO_DEPOSIT] = ({ node_id, micro, userInfo }) => {
  const { oauth_key, host, user_id, fingerprint, ip_address } = userInfo;

  return axios.patch(
    replacePathParams({
      originalUrl: `${host}${staticEndpoints[PATCH_VERIFY_MICRO_DEPOSIT]}`,
      user_id,
      node_id,
    }),
    { micro },
    {
      headers: buildHeaders({
        fingerprint,
        ip_address,
        oauth_key,
      }),
    }
  );
};
