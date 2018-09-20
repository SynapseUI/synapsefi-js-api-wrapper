
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
platformUserApiCannon
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
platformUserApiCannon
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
platformUserApiCannon
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
platformUserApiCannon
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
platformUserApiCannon.GET_ALL_CLIENT_TRANSACTIONS().then(({ data }) => {
  console.log('data: ', data);
});
```
  - page, per_page
```js
platformUserApiCannon
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

---

- GET_ALL_NODE_TRANSACTIONS

---
