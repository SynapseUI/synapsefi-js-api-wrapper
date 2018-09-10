# synapsefi-js-api-wrapper

## Install
```sh
npm install synapsefi-ui axios lodash
```

## Summary
User have node and transaction.
So all api calls will be fired from instance of ApiFactory which has information of one user.

For example
```js

```

## Examples


## Fetch Data
- [x] GET_USERS_DOCUMENT_TYPES
- [x] GET_USERS_ENTITY_TYPES
- [x] GET_USERS_ENTITY_SCOPES

## Users
- [x] GET_ALL_CLIENT_USERS
- [x] POST_CREATE_USER
- [x] GET_USER
- [x] PATCH_ADD_DOCUMENTS
- [X] PATCH_UPDATE_EXISTING_DOCUMENT
- [x] PATCH_DELETE_EXSITING_BASE_DOC
- [X] PATCH_DELETE_EXSITING_SUB_DOCS
- [X] PATCH_UPDATE_USER
- [x] PATCH_USER_PERMISSION

## Oauth
- [x] POST_OAUTH_USER

## Nodes
- [x] GET_ALL_USER_NODES
- [x] POST_CREATE_NODE
- [x] DELETE_NODE





---
- Seems like default max number of deposit node = 10
- error can be found in `error.response.data.error.en`
