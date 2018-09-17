# Node Documentation

---

- GET_ALL_USER_NODES
- GET_NODE
- POST_CREATE_NODE
- DELETE_NODE
- POST_ACH_WITH_LOGIN
- POST_ACH_WITH_MFA
- PATCH_UPDATE_NODE
- PATCH_REISSUE_DEBIT_CARD
- PATCH_REORDER_DEBIT_CARD
- POST_ACH_WITH_AC_RN
- PATCH_REINITIATE_MICRO_DEPOSIT
- PATCH_VERIFY_MICRO_DEPOSIT

---

- GET_ALL_USER_NODES
#### `base`
```js
platformUserApiCannon.GET_ALL_USER_NODES().then(({ data }) => {
  console.log('data: ', data);
});
```

> ---
#### `with page and per_page`
```js
platformUserApiCannon.GET_ALL_USER_NODES({ page: 2, per_page: 1 }).then(({ data }) => {
  console.log('data: ', data);
});
```

> ---
#### `with page, per_page, and type`
```js
platformUserApiCannon
  .GET_ALL_USER_NODES({ page: 2, per_page: 1, type: 'CHECK-US' })
  .then(({ data }) => {
    console.log('data: ', data);
  });
});
```

---

- GET_NODE
```js
platformUserApiCannon.GET_NODE({ node_id: '<node_id>' }).then(({ data }) => {
  console.log('data: ', data);
});
```

---

- POST_CREATE_NODE
```js
platformUserApiCannon
  .POST_CREATE_NODE({
    reqBody: {
      type: 'DEPOSIT-US',
      info: {
        nickname: 'My Checking',
      },
    },
  })
  .then(({ data }) => {
    console.log('data: ', data);
  });

```

---

- DELETE_NODE
```js
platformUserApiCannon.DELETE_NODE({ node_id: '<node_id>' }).then(({ data }) => {
  console.log('data: ', data);
});
```
---

- `POST_ACH_WITH_LOGIN` and `POST_ACH_WITH_MFA`
```js
platformUserApiCannon
  .POST_ACH_WITH_LOGIN({
    bank_id: 'synapse_good',
    bank_pw: 'test1234',
    bank_name: 'fake',
  })
  .then(({ data: { mfa: { access_token } } }) => {
    return platformUserApiCannon.POST_ACH_WITH_MFA({
      access_token,
      mfa_answer: 'test_answer',
    });
  })
  .then(({ data }) => {
    console.log('data: ', data);
  });
```
---

- PATCH_UPDATE_NODE
```js
platformUserApiCannon
  .PATCH_UPDATE_NODE({
    node_id: '<node id>',
    reqBody: {
      nickname: 'Updated Nickname',
    },
  })
  .then(({ data }) => {
    console.log('data: ', data);
  });
```

---

- PATCH_REISSUE_DEBIT_CARD
  - create card (user status cannot be `UNVERIFIED`)
  - > reissue debit card
  - `expect end of timel line note to be "Debit Card Reissued"`
  - delete node

---

- PATCH_REORDER_DEBIT_CARD
  - create card (user status cannot be `UNVERIFIED`)
  - > reorder debit card
  - `expect end of timel line note to be "Debit Card Reordered"`
  - delete node

---

- POST_ACH_WITH_AC_RN && PATCH_REINITIATE_MICRO_DEPOSIT && PATCH_VERIFY_MICRO_DEPOSIT
  - > create ACH AC/RN -> get node_id
  - `expect allowed "CREDIT"`
  - `expect type "ACH-US"`
  - > resend micro deposit
  - `expect time line ot have "ACH-US"`
  - `expect 2 notes of "Micro deposit initiated"`
  - > verify micro deposit
  - `expect 2 notes of allowed "CREDIT-AND-DEBIT"`
  - delete node

---

helper
- delete node
- create deposit node with (nickname)


