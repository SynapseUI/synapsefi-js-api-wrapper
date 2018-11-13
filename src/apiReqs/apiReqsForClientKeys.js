const axios = require('axios');

const { POST_GET_CLIENT_SETTINGS, POST_UPDATE_CLIENT_SETTINGS } = require('../constants/apiReqNames');

const staticEndpoints = require('../constants/staticEndpoints');

module.exports[POST_GET_CLIENT_SETTINGS] = ({ userInfo }) => {
  const { host, oauth_key } = userInfo;
  return axios.post(`${host}${staticEndpoints[POST_GET_CLIENT_SETTINGS]}`, { login: { oauth_key } });
};

module.exports[POST_UPDATE_CLIENT_SETTINGS] = ({ bodyParams, userInfo }) => {
  const { host, oauth_key } = userInfo;
  return axios.post(`${host}${staticEndpoints[POST_UPDATE_CLIENT_SETTINGS]}`, {
    login: { oauth_key },
    ...bodyParams,
  });
};
