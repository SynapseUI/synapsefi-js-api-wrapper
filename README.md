# synapsefi-js-api-wrapper

## Installation
```sh
npm installation synapsefi-ui axios lodash
```

## Motivation
`synapsefi-js-api-wrapper` was built to simplify api requests to synapsefi's core public apis.

## Table of Contents
- [Installation](#installation)
- [Motivation](#motivation)
- [Setup](#setup)
---
- [Users Api Request Examples](#users-api-request-examples)
  - [GET_ALL_CLIENT_USERS](#get-all-client-users)
    - with no argument
    - search by name or email (query)
    - specific page and per page (page, per_page)
    - conbining query, page, and per_page

  - [POST_CREATE_USER](#create-user)
  - [GET_USER](#get-user)
  - [PATCH_ADD_DOCUMENT](#add-document)
  - [PATCH_UPDATE_DOCUMENT](#update-exsiting-document)
    - update base doc
    - update sub docs
  - [PATCH_DELETE_BASE_DOC](#delete-base-doc)
  - [PATCH_DELETE_SUB_DOCS](#delete-sub-docs)
  - [PATCH_UPDATE_USER](#update-user)
    - update legal name, login email, password, and phone number
    - update cip_tag, public_note
  - [PATCH_USER_PERMISSION](#update-user-permission)
    - lock user
    - delete user
---
- [Oauth Key](#oauth-key)
  - [POST_OAUTH_USER](#set-oauth-key-to-apiCannon)

## Setup
ApiFactory generates instance of apiCannon.
We decide to name an instance as apiCannon because all it does is firing api calls.
User of this library can declare variable with diffrent naming convention.

```js
import ApiFactory from 'synapsefi-js-api-wrapper'; // for client
// const ApiFactory = require('synapsefi-js-api-wrapper'); // for node

const platformUserApiWrapper = new ApiFactory({
  host: 'sandbox or production host(ex: https://uat-api.synapsefi.com)',
  client_id: '<clinet id>',
  client_secret: '<clinet secret>',
  fingerprint: '<fingerprint>',
  ip_address: '<user_id> of platform',
  oauth_key: '<oauth_key>',
  user_id: '<user_id> of platform',
  refresh_token: '<refresh_token> of platform',
});

const endUserApiWrapper = new ApiFactory({
  host: platformUserApiWrapper.host,
  client_id: platformUserApiWrapper.client_id,
  client_secret: platformUserApiWrapper.client_secret,
  ip_address: platformUserApiWrapper.ip_address,
  user_id: '<user_id> of the end user',
  fingerprint: '<finger print when this user is created>',
  refresh_token: '<refresh_token> of the end user',
  oauth_key: '<oauth_key> of the end user',
});
```



## Users Api Request Examples

### Get all client users
###### (GET_ALL_CLIENT_USERS)

#### `with no argument`
```js
platformUserApiWrapper.GET_ALL_CLIENT_USERS().then(({data}) => {
  console.log('data: ', data);
});
```
> ---
#### `search by name or email using query`
```js
platformUserApiWrapper.GET_ALL_CLIENT_USERS({ query: 'John Doe' }).then(({data}) => {
  console.log('data: ', data);
});
```
> ---

#### `specific page and per page (page, per_page)`
```js
platformUserApiWrapper
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
platformUserApiWrapper
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
platformUserApiWrapper
  .POST_CREATE_USER({
    logins: [{ email: 'email@email.com' }],
    phone_numbers: ['123.123.1233'],
    legal_names: ['John Doe'],
    optionalBodyParams: {},
  })
  .then(({ data }) => {
    console.log('data: ', data);
  });
```

---
### Get User
###### (GET_USER)
```js
platformUserApiWrapper.GET_USER().then(({ data }) => {
  console.log('data: ', data);
});
```

---
### Add Document
###### (PATCH_ADD_DOCUMENT)
```js
const personalDocumentObj = {
  email: 'personal@email.com',
  phone_number: '1231231233',
  ip: '127.0.0.1',
  name: 'Personal Name',
  alias: 'Test',
  entity_type: 'M',
  entity_scope: 'Arts & Entertainment',
  day: 2,
  month: 5,
  year: 1989,
  address_street: '1 Market St.',
  address_city: 'SF',
  address_subdivision: 'CA',
  address_postal_code: '94114',
  address_country_code: 'US',
  social_docs: [
    {
      document_value: 'https://www.facebook.com/validasdf',
      document_type: 'FACEBOOK',
    },
  ],
};

platformUserApiWrapper
  .PATCH_ADD_DOCUMENT({
    documentObj: personalDocumentObj,
  })
  .then(({ data }) => {
    console.log('data: ', data);
  });
```
---
### Update Exsiting Document
###### (PATCH_UPDATE_DOCUMENT)

#### `update base doc`
```js
platformUserApiWrapper
  .PATCH_UPDATE_DOCUMENT({
    documentObj: {
      id: '<initialBaseDocId>',
      email: 'updated@gmail.com',
    },
  })
  .then(({ data }) => {
    console.log('data: ', data);
  });
```
> ---

#### `update sub docs`
```js
platformUserApiWrapper
  .PATCH_UPDATE_DOCUMENT({
    documentObj: {
      id: '<initialBaseDocId>',
      social_docs: [
        {
          id: '<facebookDocId>',
          document_value: 'https://www.facebook.com/afterUpdate',
          document_type: 'FACEBOOK',
        },
      ],
    },
  })
  .then(({ data }) => {
    console.log('data: ', data);
  });
```
---
### Delete Base Doc
###### (PATCH_DELETE_BASE_DOC)
```js
platformUserApiWrapper
  .PATCH_DELETE_BASE_DOC({ documentId: '<document id of base doc>' })
  .then(({ data }) => {
    console.log('data: ', data);
  });
```
---
### Delete Sub Docs
###### (PATCH_DELETE_SUB_DOCS)
```js
platformUserApiWrapper
  .PATCH_DELETE_SUB_DOCS({
    baseDocId: '<base_doc_id>',
    socialDocIds: [
      '<social_doc_id 1>',
      '<social_doc_id 2>',
      'fda60784d6375bc44eda...',
      '28d9177b22c127d9a51d...',
    ],
  })
  .then(({ data }) => {
    console.log('data: ', data);
  });
```
---
### Update User
###### (PATCH_UPDATE_USER)
#### `update legal name, login email, password, and phone number`
```js
platformUserApiWrapper
  .PATCH_UPDATE_USER({
    updateObj: {
      legal_name: 'After User',
      login: { email: 'after@email.com' },
      phone_number: '9879879877',
      remove_legal_name: 'Before User',
      remove_login: { email: 'before@email.com' },
      remove_phone_number: '1231231233',
    },
  })
  .then(({ data }) => {
    console.log('data: ', data);
  });
```

> ---
#### `update cip_tag`
```js
platformUserApiWrapper
  .PATCH_UPDATE_USER({
    updateObj: {
      legal_name: 'After User',
      cip_tag: 2,
      // public_note: 'Eask just updated public note ~~~',
    },
  })
  .then(({ data }) => {
    console.log('data: ', data);
  });
```
> If you include public note then cip tag will not be updated (bug ?)
---
### Update User Permission
###### (PATCH_USER_PERMISSION)
#### `lock user`
 ```js
 endUserApiWrapper
  .PATCH_USER_PERMISSION({
    permissionStr: 'LOCKED',
  })
  .then(({ data }) => {
    console.log('data: ', data);
  });
 ```
 > --- 
#### `delete user`
```js
 endUserApiWrapper
  .PATCH_USER_PERMISSION({
    permissionStr: 'MAKE-IT-GO-AWAY',
  })
  .then(({ data }) => {
    console.log('data: ', data);
  });
 ```
> > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > ---
> > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > --- 
 ## Oauth Key

 ```js
platformUserApiWrapper.oauth_key = 'fake oauth key';
console.log('platformUserApiWrapper.oauth_key: ', platformUserApiWrapper.oauth_key); // fake oauth key

platformUserApiWrapper.POST_OAUTH_USER().then(({ data }) => {
  console.log('data: ', data);
});

// Calling "POST_OAUTH_USER" set new oauth_key to platformUserApiWrapper.
// platformUserApiWrapper.oauth_key === data.oauth_key
console.log('platformUserApiWrapper.oauth_key: ', platformUserApiWrapper.oauth_key); // data.oauth_key
```

> > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > ---
> > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > --- 
