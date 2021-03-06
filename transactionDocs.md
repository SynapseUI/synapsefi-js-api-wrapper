
---

- POST_CREATE_TRANSACTION
- GET_TRANSACTION
- PATCH_COMMENT_ON_STATUS
- DELETE_TRANSACTION
- GET_ALL_CLIENT_TRANSACTIONS
- GET_ALL_USER_TRANSACTIONS
- GET_ALL_NODE_TRANSACTIONS

---

- POST_CREATE_TRANSACTION
```js
platformUserApiWrapper
  .POST_CREATE_TRANSACTION({
    from_node_id: '<from_node_id>',
    to_node_id: '<to_node_id>',
    to_node_type: '<to_node_type>',
    amount: 100,
    currency: 'USD',
    optionalBodyParams: {},
  })
  .then(({ data }) => {
    console.log('data: ', data);
  });
```
---

- GET_TRANSACTION
```js
platformUserApiWrapper
  .GET_TRANSACTION({
    node_id: '<from or to node_id>',
    trans_id: '<trans_id>',
  })
  .then(({ data }) => {
    console.log('data: ', data);
  });
```

---

- PATCH_COMMENT_ON_STATUS

```js
platformUserApiWrapper
  .PATCH_COMMENT_ON_STATUS({
    node_id: '<from or to node_id>',
    trans_id: '<trans_id>',
    comment: 'first comment',
  })
  .then(({ data }) => {
    console.log('data: ', data);
  });
```

---

- DELETE_TRANSACTION
```js
platformUserApiWrapper
  .DELETE_TRANSACTION({
    node_id: '<from or to node_id>',
    trans_id: '<trans_id>',
  })
  .then(({ data }) => {
    console.log('data: ', data);
  });
```
---

- GET_ALL_CLIENT_TRANSACTIONS
  - base
```js
platformUserApiWrapper.GET_ALL_CLIENT_TRANSACTIONS().then(({ data }) => {
  console.log('data: ', data);
});
```
  - page, per_page
```js
platformUserApiWrapper
  .GET_ALL_CLIENT_TRANSACTIONS({
    page: 2,
    per_page: 1,
  })
  .then(({ data }) => {
    console.log('data: ', data);
  });
```

---

- GET_ALL_USER_TRANSACTIONS
  - base
```js
platformUserApiWrapper.GET_ALL_USER_TRANSACTIONS().then(({ data }) => {
  console.log('data: ', data);
});
```

  - page, per_page
```js
platformUserApiWrapper
  .GET_ALL_USER_TRANSACTIONS({
    page: 2,
    per_page: 1,
  })
  .then(({ data }) => {
    console.log('data: ', data);
  });
```
---

- GET_ALL_NODE_TRANSACTIONS
```js
platformUserApiWrapper
  .GET_ALL_NODE_TRANSACTIONS({
    node_id: '<from or to node_id>',
  })
  .then(({ data }) => {
    console.log('data: ', data);
  });
```

  - page, per_page
```js
platformUserApiWrapper
  .GET_ALL_NODE_TRANSACTIONS({
    node_id: '<from or to node_id>',
    page: 2,
    per_page: 1,
  })
  .then(({ data }) => {
    console.log('data: ', data);
  });
```
---
