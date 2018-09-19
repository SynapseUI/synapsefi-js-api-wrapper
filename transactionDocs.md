
---

- POST_CREATE_TRANSACTION
- GET_TRANSACTION
- PATCH_COMMENT_ON_STATUS
- DELETE_TRANSACTION
- GET_ALL_CLIENT_TRANSACTIONSS
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

---

- DELETE_TRANSACTION

---

- GET_ALL_CLIENT_TRANSACTIONSS

---

- GET_ALL_USER_TRANSACTIONS

---

- GET_ALL_NODE_TRANSACTIONS

---
