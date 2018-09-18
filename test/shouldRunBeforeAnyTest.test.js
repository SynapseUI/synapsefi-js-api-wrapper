const platformUserApiCannon = require('./testHelper/platformUserApiCannon');

before(async () => {
  console.log('Set refresh_token');
  await platformUserApiCannon.GET_USER();

  console.log('Set oauth_key');
  await platformUserApiCannon.POST_OAUTH_USER();
});
