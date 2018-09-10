const axios = require('axios');

const {
  GET_USERS_DOCUMENT_TYPES,
  GET_USERS_ENTITY_TYPES,
  GET_USERS_ENTITY_SCOPES,
  GET_ALL_CLIENT_USERS,
  POST_CREATE_USER,
  GET_USER,
  PATCH_ADD_DOCUMENTS,
  PATCH_UPDATE_EXISTING_DOCUMENT,
  PATCH_DELETE_EXSITING_BASE_DOC,
  PATCH_DELETE_EXSITING_SUB_DOCS,
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
  host,
  client_id,
  client_secret,
  fingerprint,
  query,
  page,
  per_page,
  show_refresh_tokens,
  ip_address,
}) => {
  return axios.get(
    addQueryParams({
      originalUrl: `${host}${staticEndpoints[GET_ALL_CLIENT_USERS]}`,
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
  reqBody,
  host,
  client_id,
  client_secret,
  fingerprint,
  ip_address,
}) => {
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

module.exports[GET_USER] = ({
  host,
  client_id,
  client_secret,
  fingerprint,
  user_id,
  ip_address,
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
      fingerprint,
      ip_address,
    })
  );
};

module.exports[PATCH_ADD_DOCUMENTS] = ({
  reqBody,
  documentObj,
  user_id,
  host,
  oauth_key,
  client_id,
  client_secret,
  fingerprint,
  ip_address,
}) => {
  if (reqBody !== undefined && documentObj !== undefined) {
    console.error('should not submit both reqBody and documentObj');
  }

  const queryAddedUrl = addQueryParams({
    originalUrl: `${host}${staticEndpoints[PATCH_ADD_DOCUMENTS]}`,
    full_dehydrate: 'yes',
  });

  const reqBodyIfOtherReqBodyIsUndefined = { documents: [documentObj] };

  return axios.patch(
    replacePathParams({ originalUrl: queryAddedUrl, user_id }),
    reqBody || reqBodyIfOtherReqBodyIsUndefined,
    buildHeaders({
      client_id,
      client_secret,
      oauth_key,
      fingerprint,
      ip_address,
    })
  );
};

module.exports[PATCH_UPDATE_EXISTING_DOCUMENT] = ({
  reqBody,
  documentObj,
  user_id,
  host,
  oauth_key,
  client_id,
  client_secret,
  fingerprint,
  ip_address,
}) => {
  const queryAddedUrl = addQueryParams({
    originalUrl: `${host}${staticEndpoints[PATCH_UPDATE_EXISTING_DOCUMENT]}`,
  });

  const reqBodyIfOtherReqBodyIsUndefined = { documents: [documentObj] };

  return axios.patch(
    replacePathParams({ originalUrl: queryAddedUrl, user_id }),
    reqBody || reqBodyIfOtherReqBodyIsUndefined,
    buildHeaders({
      client_id,
      client_secret,
      oauth_key,
      fingerprint,
      ip_address,
    })
  );
};

module.exports[PATCH_DELETE_EXSITING_BASE_DOC] = ({
  reqBody,
  documentId,
  user_id,
  host,
  oauth_key,
  client_id,
  client_secret,
  fingerprint,
  ip_address,
}) => {
  const queryAddedUrl = addQueryParams({
    originalUrl: `${host}${staticEndpoints[PATCH_DELETE_EXSITING_BASE_DOC]}`,
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
    reqBody || reqBodyIfOtherReqBodyIsUndefined,
    buildHeaders({
      client_id,
      client_secret,
      oauth_key,
      fingerprint,
      ip_address,
    })
  );
};

module.exports[PATCH_DELETE_EXSITING_SUB_DOCS] = ({
  reqBody,
  user_id,
  base_document_id,
  physicalDocIds,
  socialDocIds,
  virtualDocIds,
  host,
  oauth_key,
  client_id,
  client_secret,
  fingerprint,
  ip_address,
}) => {
  const queryAddedUrl = addQueryParams({
    originalUrl: `${host}${staticEndpoints[PATCH_DELETE_EXSITING_SUB_DOCS]}`,
  });

  const subDocs = {};

  if (physicalDocIds !== undefined) {
    subDocs.physical_docs = addDeleteDocument(physicalDocIds);
  }

  console.log('socialDocIds: ', socialDocIds);
  if (socialDocIds !== undefined) {
    subDocs.social_docs = addDeleteDocument(socialDocIds);
  }

  if (virtualDocIds !== undefined) {
    subDocs.virtual_docs = addDeleteDocument(virtualDocIds);
  }

  const reqBodyIfOtherReqBodyIsUndefined = {
    documents: [
      {
        id: base_document_id,
        ...subDocs,
      },
    ],
  };

  return axios.patch(
    replacePathParams({ originalUrl: queryAddedUrl, user_id }),
    reqBody || reqBodyIfOtherReqBodyIsUndefined,
    buildHeaders({
      client_id,
      client_secret,
      oauth_key,
      fingerprint,
      ip_address,
    })
  );
};

module.exports[PATCH_UPDATE_USER] = ({
  reqBody,
  updateObj,
  user_id,
  host,
  oauth_key,
  client_id,
  client_secret,
  fingerprint,
  ip_address,
}) => {
  const queryAddedUrl = addQueryParams({
    originalUrl: `${host}${staticEndpoints[PATCH_UPDATE_USER]}`,
  });

  const reqBodyIfOtherReqBodyIsUndefined = { update: updateObj };

  return axios.patch(
    replacePathParams({ originalUrl: queryAddedUrl, user_id }),
    reqBody || reqBodyIfOtherReqBodyIsUndefined,
    buildHeaders({
      client_id,
      client_secret,
      oauth_key,
      fingerprint,
      ip_address,
    })
  );
};

module.exports[PATCH_USER_PERMISSION] = ({
  reqBody,
  permissionStr,
  user_id,
  host,
  oauth_key,
  client_id,
  client_secret,
  fingerprint,
  ip_address,
}) => {
  const queryAddedUrl = addQueryParams({
    originalUrl: `${host}${staticEndpoints[PATCH_USER_PERMISSION]}`,
  });

  const reqBodyIfOtherReqBodyIsUndefined = { permission: permissionStr };

  return axios.patch(
    replacePathParams({ originalUrl: queryAddedUrl, user_id }),
    reqBody || reqBodyIfOtherReqBodyIsUndefined,
    buildHeaders({
      client_id,
      client_secret,
      oauth_key,
      fingerprint,
      ip_address,
    })
  );
};
