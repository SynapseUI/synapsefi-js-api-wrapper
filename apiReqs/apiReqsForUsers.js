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

module.exports[GET_USERS] = ({
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
      originalUrl: `${host}${staticEndpoints[GET_USERS]}`,
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
  user_id,
  documentObj,
  host,
  oauth_key,
  client_id,
  client_secret,
  fingerprint,
  ip_address,
}) => {
  const queryAddedUrl = addQueryParams({
    originalUrl: `${host}${staticEndpoints[PATCH_ADD_DOCUMENTS]}`,
    full_dehydrate: 'yes',
  });

  const reqBody = { documents: [documentObj] };

  return axios.patch(
    replacePathParams({ originalUrl: queryAddedUrl, user_id }),
    reqBody,
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

  const reqBody = { documents: [documentObj] };

  return buildHeaders({
    client_id,
    client_secret,
    oauth_key,
    fingerprint,
    ip_address,
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
  ip_address,
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

  return axios.patch(
    replacePathParams({ originalUrl: queryAddedUrl, user_id }),
    reqBody,
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
  user_id,
  base_document_id,
  physicalDocIds,
  virtualDocIds,
  socialDocIds,
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

  if (virtualDocIds !== undefined) {
    subDocs.virtual_docs = addDeleteDocument(virtualDocIds);
  }

  if (socialDocIds !== undefined) {
    subDocs.social_docs = addDeleteDocument(socialDocIds);
  }

  const reqBody = {
    documents: [
      {
        id: base_document_id,
        ...subDocs,
      },
    ],
  };

  return axios.patch(
    replacePathParams({ originalUrl: queryAddedUrl, user_id }),
    reqBody,
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
  user_id,
  updateObj,
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

  const reqBody = { update: updateObj };

  return axios.patch(
    replacePathParams({ originalUrl: queryAddedUrl, user_id }),
    reqBody,
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
  permission,
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

  const reqBody = { permission };

  return axios.patch(
    replacePathParams({ originalUrl: queryAddedUrl, user_id }),
    reqBody,
    buildHeaders({
      client_id,
      client_secret,
      oauth_key,
      fingerprint,
      ip_address,
    })
  );
};
