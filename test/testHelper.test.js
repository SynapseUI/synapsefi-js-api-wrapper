const { expect } = require('chai');

const testHelpers = require('./testHelpers');

it.only('test get user id & refresh tocken after creating user', async () => {
  const { user_id, refresh_token } = await testHelpers.getUserIdAndRefreshTokenByCreatingUser();
  console.log('refresh_token: ', refresh_token);
  console.log('user_id: ', user_id);
});

it.only('get oauth key from refresh token', async () => {
  const { user_id, refresh_token } = await testHelpers.getUserIdAndRefreshTokenByCreatingUser();
  const { oauth_key } = await testHelpers.getOauthFromRefreshToken(user_id, refresh_token);
  console.log('oauth_key: ', oauth_key);
});
