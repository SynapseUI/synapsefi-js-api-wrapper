const axios = require('axios');

const { GET_USERS, POST_CREATE_USER, GET_USER } = require('../constants/apiReqNames');
const staticEndpoints = require('../constants/staticEndpoints');
const { buildHeaders } = require('../helpers/helperFuncsForApis');
const { addQueryParams, replacePathParams } = require('../helpers/urlBuilders');

module.exports[GET_USERS] = ({
  host,
  client_id,
  client_secret,
  ip_address,
  fingerprint,
  query,
  page,
  per_page,
  show_refresh_tokens,
}) => {
  return axios.get(
    addQueryParams({
      originalUrl: `${host}${staticEndpoints[GET_USERS]}`,
      query,
      page,
      per_page,
      show_refresh_tokens,
    }),
    buildHeaders({
      client_id,
      client_secret,
      ip_address,
      fingerprint,
    })
  );
};

module.exports[POST_CREATE_USER] = ({
  reqBody,
  host,
  client_id,
  client_secret,
  ip_address,
  fingerprint,
}) => {
  const { logins, phone_numbers, legal_names } = reqBody;

  const errMessages = [];

  [
    { value: logins, text: 'logins is required' },
    { value: phone_numbers, text: 'phone_numbers is required' },
    { value: legal_names, text: 'legal_names is required' },
  ].forEach(({ value, text }) => {
    if (value === undefined) errMessages.push(text);
  });

  if (errMessages.length > 0) throw errMessages.join(', ');

  return axios.post(
    `${host}${staticEndpoints[POST_CREATE_USER]}`,
    reqBody,
    buildHeaders({
      client_id,
      client_secret,
      ip_address,
      fingerprint,
    })
  );
};

module.exports[GET_USER] = ({
  host,
  client_id,
  client_secret,
  ip_address,
  fingerprint,
  user_id,
}) => {
  const queryAddedUrl = addQueryParams({
    originalUrl: `${host}${staticEndpoints[GET_USER]}`,
    full_dehydrate: 'yes',
  });

  return axios.get(
    replacePathParams({ originalUrl: queryAddedUrl, user_id }),
    buildHeaders({
      client_id,
      client_secret,
      ip_address,
      fingerprint,
    })
  );
};
