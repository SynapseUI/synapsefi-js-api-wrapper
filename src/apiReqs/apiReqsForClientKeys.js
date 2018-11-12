const axios = require('axios');

const { POST_CLIENT_KEYS } = require('../constants/apiReqNames');

const staticEndpoints = require('../constants/staticEndpoints');

module.exports[POST_CLIENT_KEYS] = ({ userInfo }) => {
  const { host, oauth_key } = userInfo;
  return axios.post(`${host}${staticEndpoints[POST_CLIENT_KEYS]}`, { login: { oauth_key } });
};
