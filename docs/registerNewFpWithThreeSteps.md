## REGISTERING NEW FINGERPRINT

#### If you wish to register a new device fingerprint to the user account and use our two factor authentication (2FA) security protocols, complete the the following steps:

- Step 1: Supply the new fingerprint.
```js
platformUserApiWrapper
  .POST_OAUTH_USER({
    bodyParams: { refresh_token: '<refresh_token>' },
  })
  .then(({ data }) => {
    console.log('data: ', data);
  });
```
---

- Step 2: Supply 2FA device from the list.
```js
platformUserApiWrapper
  .POST_OAUTH_USER({
    bodyParams: {
      refresh_token: '<refresh_token>',
      phone_number: 'example@email.com',
    },
  })
  .then(({ data }) => {
    console.log('data: ', data);
  });
```
---

- Step 3: Supply 2FA device from the list.
```js
platformUserApiWrapper
  .POST_OAUTH_USER({
    bodyParams: {
      refresh_token: '<refresh_token>',
      validation_pin: '123456',
    },
  })
  .then(({ data }) => {
    console.log('data: ', data);
  });
```
