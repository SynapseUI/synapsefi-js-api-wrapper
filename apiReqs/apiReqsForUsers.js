const axios = require('axios');
const apiReqNames = require('../constants/apiReqNames');
const staticEndpoints = require('../constants/staticEndpoints');
const { buildHeaders } = require('../helpers/helperFuncsForApis');
const { addQueryParams } = require('../helpers/urlBuilders');

module.exports[apiReqNames.GET_USERS] = ({
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
      originalUrl: `${host}${staticEndpoints[apiReqNames.GET_USERS]}`,
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

module.exports[apiReqNames.POST_CREATE_USER] = ({
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
    `${host}${staticEndpoints[apiReqNames.POST_CREATE_USER]}`,
    reqBody,
    buildHeaders({
      client_id,
      client_secret,
      ip_address,
      fingerprint,
    })
  );
};

//   // [apiReqNames.POST_CREATE_USER]: () => {},
//   // [apiReqNames.GET_USER]: () => {},
//   [apiReqNames.PATCH_ADD_DOCUMENTS]: ({
//     oauth_key,
//     req_body,
//     user_id,
//     client_id,
//     client_secret,
//     ip_address,
//     fingerprint,
//   }) => {
//     const headers = construct_headers({
//       client_id,
//       client_secret,
//       ip_address,
//       fingerprint,
//       oauth_key,
//     });

//     console.log('headers: ', headers);
//     return axios.patch(
//       replacePathParams({ originalUrl: apiStaticRoutes[apiReqNames.PATCH_ADD_DOCUMENTS], user_id }),
//       req_body,
//       headers
//     );
//   },
//   // [apiReqNames.PATCH_UPDATE_EXISTING_DOCUMENT]: () => {},
//   // [apiReqNames.PATCH_DELETE_EXISTING_DOCUMENT]: () => {},
//   // [apiReqNames.PATCH_UPDATE_USER]: () => {},
// };
