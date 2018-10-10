const axios = require('axios');

const {
  GET_USERS_DOCUMENT_TYPES,
  GET_USERS_ENTITY_TYPES,
  GET_USERS_ENTITY_SCOPES,
  GET_ALL_CLIENT_USERS,
  POST_CREATE_USER,
  GET_USER,
  PATCH_ADD_DOCUMENT,
  PATCH_UPDATE_DOCUMENT,
  PATCH_DELETE_BASE_DOC,
  PATCH_DELETE_SUB_DOCS,
  PATCH_UPDATE_USER,
  PATCH_USER_PERMISSION,
} = require('../constants/apiReqNames');

const staticEndpoints = require('../constants/staticEndpoints');
const buildHeaders = require('../helpers/buildHeaders');
const { addQueryParams, replacePathParams } = require('../helpers/urlBuilders');
const addDeleteDocument = require('../helpers/addDeleteDocument');

module.exports[GET_USERS_DOCUMENT_TYPES] = ({ host }) => {
  return axios.get(`${host}${staticEndpoints[GET_USERS_DOCUMENT_TYPES]}`);
};

module.exports[GET_USERS_ENTITY_TYPES] = ({ host }) => {
  return axios.get(`${host}${staticEndpoints[GET_USERS_ENTITY_TYPES]}`);
};

module.exports[GET_USERS_ENTITY_SCOPES] = ({ host }) => {
  return axios.get(`${host}${staticEndpoints[GET_USERS_ENTITY_SCOPES]}`);
};

module.exports[GET_ALL_CLIENT_USERS] = ({
  mongoQuery,
  query,
  page,
  per_page,
  show_refresh_tokens,
  userInfo,
}) => {
  const { host, client_id, client_secret, fingerprint, ip_address } = userInfo;

  return axios.get(
    addQueryParams({
      originalUrl: `${host}${staticEndpoints[GET_ALL_CLIENT_USERS]}`,
      mongoQuery,
      query,
      page,
      per_page,
      show_refresh_tokens,
    }),
    buildHeaders({
      client_id,
      client_secret,
      fingerprint,
      ip_address,
    })
  );
};

module.exports[POST_CREATE_USER] = ({
  logins,
  phone_numbers,
  legal_names,
  bodyParams,
  userInfo,
}) => {
  const { host, client_id, client_secret, fingerprint, ip_address } = userInfo;
  const reqBody = bodyParams || { logins, phone_numbers, legal_names };

  return axios.post(
    `${host}${staticEndpoints[POST_CREATE_USER]}`,
    reqBody,
    buildHeaders({
      client_id,
      client_secret,
      fingerprint,
      ip_address,
    })
  );
};

module.exports[GET_USER] = ({ userInfo }) => {
  const { user_id, host, client_id, client_secret, fingerprint, ip_address, oauth_key } = userInfo;

  const queryAddedUrl = addQueryParams({
    originalUrl: `${host}${staticEndpoints[GET_USER]}`,
    full_dehydrate: 'yes',
  });

  return axios.get(
    replacePathParams({ originalUrl: queryAddedUrl, user_id }),
    buildHeaders({
      client_id,
      client_secret,
      fingerprint,
      ip_address,
    })
  );
};

module.exports[PATCH_ADD_DOCUMENT] = ({ bodyParams, documentObj, userInfo }) => {
  const { user_id, host, client_id, client_secret, fingerprint, ip_address, oauth_key } = userInfo;

  if (bodyParams !== undefined && documentObj !== undefined) {
    console.error('should not submit both bodyParams and documentObj');
  }

  const queryAddedUrl = addQueryParams({
    originalUrl: `${host}${staticEndpoints[PATCH_ADD_DOCUMENT]}`,
  });

  const reqBodyIfOtherReqBodyIsUndefined = { documents: [documentObj] };

  return axios.patch(
    replacePathParams({ originalUrl: queryAddedUrl, user_id }),
    bodyParams || reqBodyIfOtherReqBodyIsUndefined,
    buildHeaders({
      client_id,
      client_secret,
      oauth_key,
      fingerprint,
      ip_address,
    })
  );
};

module.exports[PATCH_UPDATE_DOCUMENT] = ({ bodyParams, documentObj, userInfo }) => {
  const { user_id, host, client_id, client_secret, fingerprint, ip_address, oauth_key } = userInfo;

  const queryAddedUrl = addQueryParams({
    originalUrl: `${host}${staticEndpoints[PATCH_UPDATE_DOCUMENT]}`,
  });

  const reqBodyIfOtherReqBodyIsUndefined = { documents: [documentObj] };

  return axios.patch(
    replacePathParams({ originalUrl: queryAddedUrl, user_id }),
    bodyParams || reqBodyIfOtherReqBodyIsUndefined,
    buildHeaders({
      client_id,
      client_secret,
      oauth_key,
      fingerprint,
      ip_address,
    })
  );
};

module.exports[PATCH_DELETE_BASE_DOC] = ({ bodyParams, documentId, userInfo }) => {
  const { user_id, host, client_id, client_secret, fingerprint, ip_address, oauth_key } = userInfo;

  const queryAddedUrl = addQueryParams({
    originalUrl: `${host}${staticEndpoints[PATCH_DELETE_BASE_DOC]}`,
  });

  const reqBodyIfOtherReqBodyIsUndefined = {
    documents: [
      {
        id: documentId,
        permission_scope: 'DELETE_DOCUMENT',
      },
    ],
  };

  return axios.patch(
    replacePathParams({ originalUrl: queryAddedUrl, user_id }),
    bodyParams || reqBodyIfOtherReqBodyIsUndefined,
    buildHeaders({
      client_id,
      client_secret,
      oauth_key,
      fingerprint,
      ip_address,
    })
  );
};

module.exports[PATCH_DELETE_SUB_DOCS] = ({
  bodyParams,
  baseDocId,
  physicalDocIds,
  socialDocIds,
  virtualDocIds,
  userInfo,
}) => {
  const { user_id, host, client_id, client_secret, fingerprint, ip_address, oauth_key } = userInfo;

  const queryAddedUrl = addQueryParams({
    originalUrl: `${host}${staticEndpoints[PATCH_DELETE_SUB_DOCS]}`,
  });

  const subDocs = {};

  if (physicalDocIds !== undefined) {
    subDocs.physical_docs = addDeleteDocument(physicalDocIds);
  }

  if (socialDocIds !== undefined) {
    subDocs.social_docs = addDeleteDocument(socialDocIds);
  }

  if (virtualDocIds !== undefined) {
    subDocs.virtual_docs = addDeleteDocument(virtualDocIds);
  }

  const reqBodyIfOtherReqBodyIsUndefined = {
    documents: [
      {
        id: baseDocId,
        ...subDocs,
      },
    ],
  };

  return axios.patch(
    replacePathParams({ originalUrl: queryAddedUrl, user_id }),
    bodyParams || reqBodyIfOtherReqBodyIsUndefined,
    buildHeaders({
      client_id,
      client_secret,
      oauth_key,
      fingerprint,
      ip_address,
    })
  );
};

module.exports[PATCH_UPDATE_USER] = ({ bodyParams, updateObj, userInfo }) => {
  const { user_id, host, client_id, client_secret, fingerprint, ip_address, oauth_key } = userInfo;

  const queryAddedUrl = addQueryParams({
    originalUrl: `${host}${staticEndpoints[PATCH_UPDATE_USER]}`,
  });

  const reqBodyIfOtherReqBodyIsUndefined = { update: updateObj };

  return axios.patch(
    replacePathParams({ originalUrl: queryAddedUrl, user_id }),
    bodyParams || reqBodyIfOtherReqBodyIsUndefined,
    buildHeaders({
      client_id,
      client_secret,
      oauth_key,
      fingerprint,
      ip_address,
    })
  );
};

module.exports[PATCH_USER_PERMISSION] = ({ bodyParams, permission, userInfo }) => {
  const { user_id, host, client_id, client_secret, fingerprint, ip_address, oauth_key } = userInfo;

  const queryAddedUrl = addQueryParams({
    originalUrl: `${host}${staticEndpoints[PATCH_USER_PERMISSION]}`,
  });

  const reqBodyIfOtherReqBodyIsUndefined = { permission: permission };

  return axios.patch(
    replacePathParams({ originalUrl: queryAddedUrl, user_id }),
    bodyParams || reqBodyIfOtherReqBodyIsUndefined,
    buildHeaders({
      client_id,
      client_secret,
      oauth_key,
      fingerprint,
      ip_address,
    })
  );
};
