# synapsefi-js-api-wrapper (ApiFactory)

## Installation
```sh
npm installation synapsefi-ui axios lodash
```

## Motivation
`synapsefi-js-api-wrapper` was built to simplify api requrest to synapsefi's core public apis.


## Table of Contents
- [Installation](#installation)
- [Motivation](#motivation)
- [Setup](#setup)

- [Users Api Request Examples](#users-api-request-examples)
  - [GET_ALL_CLIENT_USERS](#get-all-client-users)
    - with no argument
    - search by name or email (query)
    - specific page and per page (page, per_page)
    - conbining query, page, and per_page

  - [POST_CREATE_USER](#create-user)
  - [GET_USER](#get-user)
  - [PATCH_ADD_DOCUMENTS](#add-document)
  - [PATCH_UPDATE_EXISTING_DOCUMENT](#update-exsiting-document)
  - [PATCH_DELETE_EXSITING_BASE_DOC](#delete-base-doc)
  - [PATCH_DELETE_EXSITING_SUB_DOCS](#delete-sub-docs)
  - [PATCH_UPDATE_USER](#update-user)
  - [PATCH_USER_PERMISSION](#update-user-permission)


## Setup
ApiFactory generates instance of apiCannon.
We decide to name an instance as apiCannon because all it does is firing api calls.
User of this library can declare variable with diffrent naming convention.

```js
import ApiFactory from 'synapsefi-js-api-wrapper';

const platformUserApiCannon = new ApiFactory({
  host: 'sandbox or production host(ex: https://uat-api.synapsefi.com)',
  client_id: '<clinet id>',
  client_secret: '<clinet secret>',
  oauth_key: '<oauth_key>',
  fingerprint: '<fingerprint>',
  ip_address: '<user_id> of platform',
  user_id: '<user_id> of platform',
  refresh_token: '<user_id> of platform',
});

const endUserApiCannon = new ApiFactory({
  host: platformUserApiCannon.host,
  client_id: platformUserApiCannon.client_id,
  client_secret: platformUserApiCannon.client_secret,
  oauth_key: platformUserApiCannon.oauth_key,
  fingerprint: platformUserApiCannon.fingerprint,
  ip_address: platformUserApiCannon.ip_address,
  user_id: '<user_id> of end user',
  refresh_token: '<user_id> of end user',
});
```

## Users Api Request Examples

### Get all client users
###### (GET_ALL_CLIENT_USERS)

#### `with no argument`
```js
platformUserApiCannon.GET_ALL_CLIENT_USERS().then(({data}) => {
  console.log('data: ', data);
});
```
> ---
#### `search by name or email using query`
```js
platformUserApiCannon.GET_ALL_CLIENT_USERS({ query: 'John Doe' }).then(({data}) => {
  console.log('data: ', data);
});
```
> ---

#### `specific page and per page (page, per_page)`
```js
platformUserApiCannon
  .GET_ALL_CLIENT_USERS({
    page: 2,
    per_page: 3,
  })
  .then(({ data }) => {
    console.log('data: ', data);
  });
```

> ---

#### `conbining query, page, and per_page`
```js
platformUserApiCannon
  .GET_ALL_CLIENT_USERS({
    query: 'sean@gmail.com',
    page: 1,
    per_page: 2,
  })
  .then(({ data }) => {
    console.log('data: ', data);
  });
```

---

### Create User
###### (POST_CREATE_USER)
```js
const reqBody = {
  logins: [{ email: 'email@gmial.com' }],
  phone_numbers: ['123.123.1233'],
  legal_names: ['John Doe'],
};

platformUserApiCannon.POST_CREATE_USER({ reqBody }).then(({ data }) => {
  console.log('data: ', data);
});
```

---
### Get User
```js
platformUserApiCannon.GET_USER().then(({ data }) => {
  console.log('data: ', data);
});
```

---
### Add Document

---
### Update Exsiting Document

---
### Delete Base Doc

---
### Delete Sub Docs

---
### Update User

---
### Update User Permission

