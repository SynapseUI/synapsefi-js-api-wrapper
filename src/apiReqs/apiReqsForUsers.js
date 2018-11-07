const axios = require('axios');

const {
  GET_USERS_DOCUMENT_TYPES,
  GET_USERS_ENTITY_TYPES,
  GET_USERS_ENTITY_SCOPES,
  GET_ALL_CLIENT_USERS,
  POST_CREATE_USER,
  GET_USER,
  PATCH_ADD_NEW_DOCUMENTS,
  PATCH_UPDATE_DOCUMENTS,
  PATCH_DELETE_BASE_DOC,
  PATCH_DELETE_SUB_DOCS,
  PATCH_UPDATE_USER,
  PATCH_USER_PERMISSION,
} = require('../constants/apiReqNames');

const staticEndpoints = require('../constants/staticEndpoints');
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
  const { host, headers } = userInfo;

  return axios.get(
    addQueryParams({
      originalUrl: `${host}${staticEndpoints[GET_ALL_CLIENT_USERS]}`,
      mongoQuery,
      query,
      page,
      per_page,
      show_refresh_tokens,
    }),
    { headers }
  );
};

module.exports[POST_CREATE_USER] = ({
  logins,
  phone_numbers,
  legal_names,
  bodyParams,
  userInfo,
}) => {
  const { host, headers } = userInfo;
  const reqBody = bodyParams || { logins, phone_numbers, legal_names };

  return axios.post(`${host}${staticEndpoints[POST_CREATE_USER]}`, reqBody, { headers });
};

module.exports[GET_USER] = ({ userInfo }) => {
  const { user_id, host, headers } = userInfo;

  const queryAddedUrl = addQueryParams({
    originalUrl: `${host}${staticEndpoints[GET_USER]}`,
    full_dehydrate: 'yes',
  });

  return axios.get(replacePathParams({ originalUrl: queryAddedUrl, user_id }), { headers });
};

module.exports[PATCH_ADD_NEW_DOCUMENTS] = ({ bodyParams, documents, userInfo }) => {
  const { user_id, host, headers } = userInfo;

  if (bodyParams !== undefined && documents !== undefined) {
    console.error('should not submit both bodyParams and documents');
  }

  const queryAddedUrl = addQueryParams({
    originalUrl: `${host}${staticEndpoints[PATCH_ADD_NEW_DOCUMENTS]}`,
  });

  const reqBodyIfOtherReqBodyIsUndefined = { documents };

  return axios.patch(
    replacePathParams({ originalUrl: queryAddedUrl, user_id }),
    bodyParams || reqBodyIfOtherReqBodyIsUndefined,
    { headers }
  );
};

module.exports[PATCH_UPDATE_DOCUMENTS] = ({ bodyParams, documents, userInfo }) => {
  const { user_id, host, headers } = userInfo;

  const queryAddedUrl = addQueryParams({
    originalUrl: `${host}${staticEndpoints[PATCH_UPDATE_DOCUMENTS]}`,
  });

  const reqBodyIfOtherReqBodyIsUndefined = { documents };

  return axios.patch(
    replacePathParams({ originalUrl: queryAddedUrl, user_id }),
    bodyParams || reqBodyIfOtherReqBodyIsUndefined,
    { headers }
  );
};

module.exports[PATCH_DELETE_BASE_DOC] = ({ bodyParams, baseDocId, userInfo }) => {
  const { user_id, host, headers } = userInfo;

  const queryAddedUrl = addQueryParams({
    originalUrl: `${host}${staticEndpoints[PATCH_DELETE_BASE_DOC]}`,
  });

  const reqBodyIfOtherReqBodyIsUndefined = {
    documents: [
      {
        id: baseDocId,
        permission_scope: 'DELETE_DOCUMENT',
      },
    ],
  };

  return axios.patch(
    replacePathParams({ originalUrl: queryAddedUrl, user_id }),
    bodyParams || reqBodyIfOtherReqBodyIsUndefined,
    { headers }
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
  const { user_id, host, headers } = userInfo;

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
    { headers }
  );
};

module.exports[PATCH_UPDATE_USER] = ({ bodyParams, updateObj, userInfo }) => {
  const { user_id, host, headers } = userInfo;

  const queryAddedUrl = addQueryParams({
    originalUrl: `${host}${staticEndpoints[PATCH_UPDATE_USER]}`,
  });

  const reqBodyIfOtherReqBodyIsUndefined = { update: updateObj };

  return axios.patch(
    replacePathParams({ originalUrl: queryAddedUrl, user_id }),
    bodyParams || reqBodyIfOtherReqBodyIsUndefined,
    { headers }
  );
};

module.exports[PATCH_USER_PERMISSION] = ({ bodyParams, permission, userInfo }) => {
  const { user_id, host, headers } = userInfo;

  const queryAddedUrl = addQueryParams({
    originalUrl: `${host}${staticEndpoints[PATCH_USER_PERMISSION]}`,
  });

  const reqBodyIfOtherReqBodyIsUndefined = { permission };

  return axios.patch(
    replacePathParams({ originalUrl: queryAddedUrl, user_id }),
    bodyParams || reqBodyIfOtherReqBodyIsUndefined,
    { headers }
  );
};
