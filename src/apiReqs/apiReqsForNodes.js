const axios = require('axios');

const {
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

module.exports[POST_CREATE_NODE] = ({ reqBody, userInfo }) => {
  const { oauth_key, host, user_id, fingerprint, ip_address } = userInfo;

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

module.exports[GET_ALL_USER_NODES] = ({ page, per_page, type, userInfo }) => {
  const { oauth_key, host, user_id, fingerprint, ip_address } = userInfo;

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

module.exports[DELETE_NODE] = ({ node_id, userInfo }) => {
  const { oauth_key, host, user_id, fingerprint, ip_address } = userInfo;

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

module.exports[GET_NODE] = ({ node_id, userInfo }) => {
  const { oauth_key, host, user_id, fingerprint, ip_address } = userInfo;

  return axios.get(
    replacePathParams({
      originalUrl: `${host}${staticEndpoints[GET_NODE]}`,
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
    buildHeaders({
      fingerprint,
      ip_address,
      oauth_key,
    })
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
    buildHeaders({
      fingerprint,
      ip_address,
      oauth_key,
    })
  );
};

module.exports[PATCH_UPDATE_NODE] = ({ node_id, reqBody, userInfo }) => {
  const { oauth_key, host, user_id, fingerprint, ip_address } = userInfo;

  return axios.patch(
    replacePathParams({
      originalUrl: `${host}${staticEndpoints[PATCH_UPDATE_NODE]}`,
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

// * PATCH_REISSUE_DEBIT_CARD
// * PATCH_REORDER_DEBIT_CARD

module.exports[POST_ACH_WITH_AC_RN] = ({ reqBody, userInfo }) => {
  const { oauth_key, host, user_id, fingerprint, ip_address } = userInfo;

  return axios.post(
    replacePathParams({
      originalUrl: `${host}${staticEndpoints[POST_ACH_WITH_AC_RN]}`,
      user_id,
    }),
    {
      ...reqBody,
      type: 'ACH-US',
    },
    buildHeaders({
      fingerprint,
      ip_address,
      oauth_key,
    })
  );
};
