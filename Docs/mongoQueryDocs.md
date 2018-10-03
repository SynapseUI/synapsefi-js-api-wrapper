# mongoQuery

---

- GET_ALL_CLIENT_USERS
  1. by user_id

- GET_ALL_CLIENT_NODES
  1. by user_id
  2. by node_id

- GET_ALL_CLIENT_TRANSACTIONS
  1. by user_id
  2. by node_id
  3. by trans_id

---

- GET_ALL_CLIENT_USERS

1. by user_id
```js
platformUserApiWrapper
  .GET_ALL_CLIENT_USERS({
    mongoQuery: { _id: '<user_id>' },
  })
  .then(({ data }) => {
    console.log('data: ', data);
  });
```
---


- GET_ALL_CLIENT_NODES

1. by user_id
```js
platformUserApiWrapper
  .GET_ALL_CLIENT_NODES({
    mongoQuery: { user_id: '<user_id>' },
  })
  .then(({ data }) => {
    console.log('data: ', data);
  });
```

> ---

2. by node_id
```js
platformUserApiWrapper
  .GET_ALL_CLIENT_NODES({
    mongoQuery: { _id: '<node_id>' },
  })
  .then(({ data }) => {
    console.log('data: ', data);
  });
```

---

- GET_ALL_CLIENT_TRANSACTIONS

1. by user_id
```js
platformUserApiWrapper
  .GET_ALL_CLIENT_TRANSACTIONS({
    mongoQuery: {
      $or: [{ 'from.user._id': '<from user id>' }, { 'to.user._id': '<from user id>' }],
    },
  })
  .then(({ data }) => {
    console.log('data: ', data);
  });
```

> ---
2. by node_id
```js
platformUserApiWrapper
  .GET_ALL_CLIENT_TRANSACTIONS({
    mongoQuery: {
      $or: [{ 'from.id': '<from node id>' }, { 'to.id': '<to node id>' }],
    },
  })
  .then(({ data }) => {
    console.log('data: ', data);
  });
```
> ---
3. by trans_id
```js
platformUserApiWrapper
  .GET_ALL_CLIENT_TRANSACTIONS({
    mongoQuery: { _id: '<trans_id>' },
  })
  .then(({ data }) => {
    console.log('data: ', data);
  });
```