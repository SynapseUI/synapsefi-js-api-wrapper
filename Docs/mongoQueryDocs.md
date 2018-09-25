# Node Documentation

---

- GET_ALL_CLIENT_USERS
  - by user_id
  - by node_id
  - by trans_id

- GET_ALL_CLIENT_NODES
  - by user_id
  - by node_id
  - by trans_id

- GET_ALL_CLIENT_TRANSACTIONS
  - by user_id
  - by node_id
  - by trans_id

---

- GET_ALL_CLIENT_NODES
#### `base`
```js
platformUserApiWrapper.GET_ALL_CLIENT_NODES().then(({ data }) => {
  console.log('data: ', data);
});
```

> ---
#### `with page and per_page`
```js
platformUserApiWrapper
  .GET_ALL_CLIENT_NODES({
    page: 2,
    per_page: 1,
  })
  .then(({ data }) => {
    console.log('data: ', data);
  });
```

---

- GET_ALL_USER_NODES
#### `base`
```js
platformUserApiWrapper.GET_ALL_USER_NODES().then(({ data }) => {
  console.log('data: ', data);
});
```

> ---
#### `with page and per_page`
```js
platformUserApiWrapper.GET_ALL_USER_NODES({ page: 2, per_page: 1 }).then(({ data }) => {
  console.log('data: ', data);
});
```
