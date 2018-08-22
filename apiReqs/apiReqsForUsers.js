const axios = require('axios');

const {
  GET_USERS_DOCUMENT_TYPES,
  GET_USERS_ENTITY_TYPES,
  GET_USERS_ENTITY_SCOPES,
  GET_USERS,
  POST_CREATE_USER,
  GET_USER,
  PATCH_ADD_DOCUMENTS,
  PATCH_UPDATE_EXISTING_DOCUMENT,
  PATCH_DELETE_EXSITING_BASE_DOC,
  PATCH_DELETE_EXSITING_SUB_DOCS,
  PATCH_UPDATE_USER,
  PATCH_DELETE_USER,
} = require('../constants/apiReqNames');

const staticEndpoints = require('../constants/staticEndpoints');
const buildHeaders = require('../helpers/buildHeaders');
const { addQueryParams, replacePathParams } = require('../helpers/urlBuilders');
const addPermissionScopeDeleteDocument = require('../helpers/addPermissionScopeDeleteDocument');

module.exports[GET_USERS_DOCUMENT_TYPES] = ({ host }) => {
  return axios.get(`${host}${staticEndpoints[GET_USERS_DOCUMENT_TYPES]}`);
};

module.exports[GET_USERS_ENTITY_TYPES] = ({ host }) => {
  return axios.get(`${host}${staticEndpoints[GET_USERS_ENTITY_TYPES]}`);
};

module.exports[GET_USERS_ENTITY_SCOPES] = ({ host }) => {
  return axios.get(`${host}${staticEndpoints[GET_USERS_ENTITY_SCOPES]}`);
};

module.exports[GET_USERS] = ({
  host,
  client_id,
  client_secret,
  fingerprint,
  query,
  page,
  per_page,
  show_refresh_tokens,
}) => {
  return buildHeaders({
    client_id,
    client_secret,
    fingerprint,
  }).then(config => {
    return axios.get(
      addQueryParams({
        originalUrl: `${host}${staticEndpoints[GET_USERS]}`,
        query,
        page,
        per_page,
        show_refresh_tokens,
      }),
      config
    );
  });
};

module.exports[POST_CREATE_USER] = ({ reqBody, host, client_id, client_secret, fingerprint }) => {
  return buildHeaders({
    client_id,
    client_secret,
    fingerprint,
  }).then(config => {
    return axios.post(`${host}${staticEndpoints[POST_CREATE_USER]}`, reqBody, config);
  });
};

module.exports[GET_USER] = ({ host, client_id, client_secret, fingerprint, user_id }) => {
  const queryAddedUrl = addQueryParams({
    originalUrl: `${host}${staticEndpoints[GET_USER]}`,
    full_dehydrate: 'yes',
  });

  return buildHeaders({
    client_id,
    client_secret,
    fingerprint,
  }).then(config => {
    return axios.get(replacePathParams({ originalUrl: queryAddedUrl, user_id }), config);
  });
};

module.exports[PATCH_ADD_DOCUMENTS] = ({
  user_id,
  documentObj,
  host,
  oauth_key,
  client_id,
  client_secret,
  fingerprint,
}) => {
  const queryAddedUrl = addQueryParams({
    originalUrl: `${host}${staticEndpoints[PATCH_ADD_DOCUMENTS]}`,
    full_dehydrate: 'yes',
  });

  const reqBody = { documents: [documentObj] };

  return buildHeaders({
    client_id,
    client_secret,
    oauth_key,
    fingerprint,
  }).then(config => {
    return axios.patch(replacePathParams({ originalUrl: queryAddedUrl, user_id }), reqBody, config);
  });
};

module.exports[PATCH_UPDATE_EXISTING_DOCUMENT] = ({
  documentObj,
  user_id,
  host,
  oauth_key,
  client_id,
  client_secret,
  fingerprint,
}) => {
  const queryAddedUrl = addQueryParams({
    originalUrl: `${host}${staticEndpoints[PATCH_UPDATE_EXISTING_DOCUMENT]}`,
  });

  const reqBody = { documents: [documentObj] };

  return buildHeaders({
    client_id,
    client_secret,
    oauth_key,
    fingerprint,
  }).then(config => {
    return axios.patch(replacePathParams({ originalUrl: queryAddedUrl, user_id }), reqBody, config);
  });
};

module.exports[PATCH_DELETE_EXSITING_BASE_DOC] = ({
  user_id,
  document_id,
  host,
  oauth_key,
  client_id,
  client_secret,
  fingerprint,
}) => {
  const queryAddedUrl = addQueryParams({
    originalUrl: `${host}${staticEndpoints[PATCH_DELETE_EXSITING_BASE_DOC]}`,
  });

  const reqBody = {
    documents: [
      {
        id: document_id,
        permission_scope: 'DELETE_DOCUMENT',
      },
    ],
  };

  return buildHeaders({
    client_id,
    client_secret,
    oauth_key,
    fingerprint,
  }).then(config => {
    return axios.patch(replacePathParams({ originalUrl: queryAddedUrl, user_id }), reqBody, config);
  });
};

module.exports[PATCH_DELETE_EXSITING_SUB_DOCS] = ({
  user_id,
  base_document_id,
  physical_docs,
  virtual_docs,
  social_docs,
  host,
  oauth_key,
  client_id,
  client_secret,
  fingerprint,
}) => {
  const queryAddedUrl = addQueryParams({
    originalUrl: `${host}${staticEndpoints[PATCH_DELETE_EXSITING_SUB_DOCS]}`,
  });

  const subDocs = {};

  if (physical_docs !== undefined) {
    subDocs.physical_docs = addPermissionScopeDeleteDocument(physical_docs);
  }

  if (virtual_docs !== undefined) {
    subDocs.virtual_docs = addPermissionScopeDeleteDocument(virtual_docs);
  }

  if (social_docs !== undefined) {
    subDocs.social_docs = addPermissionScopeDeleteDocument(social_docs);
  }

  const reqBody = {
    documents: [
      {
        id: base_document_id,
        ...subDocs,
      },
    ],
  };

  return buildHeaders({
    client_id,
    client_secret,
    oauth_key,
    fingerprint,
  }).then(config => {
    return axios.patch(replacePathParams({ originalUrl: queryAddedUrl, user_id }), reqBody, config);
  });
};

module.exports[PATCH_UPDATE_USER] = ({
  user_id,
  updateObj,
  host,
  oauth_key,
  client_id,
  client_secret,
  fingerprint,
}) => {
  const queryAddedUrl = addQueryParams({
    originalUrl: `${host}${staticEndpoints[PATCH_UPDATE_USER]}`,
  });

  const reqBody = { update: updateObj };

  return buildHeaders({
    client_id,
    client_secret,
    oauth_key,
    fingerprint,
  }).then(config => {
    return axios.patch(replacePathParams({ originalUrl: queryAddedUrl, user_id }), reqBody, config);
  });
};

module.exports[PATCH_DELETE_USER] = ({
  user_id,
  host,
  oauth_key,
  client_id,
  client_secret,
  fingerprint,
}) => {
  const queryAddedUrl = addQueryParams({
    originalUrl: `${host}${staticEndpoints[PATCH_DELETE_USER]}`,
  });

  const reqBody = { permission: 'MAKE-IT-GO-AWAY' };

  return buildHeaders({
    client_id,
    client_secret,
    oauth_key,
    fingerprint,
  }).then(config => {
    return axios.patch(replacePathParams({ originalUrl: queryAddedUrl, user_id }), reqBody, config);
  });
};
