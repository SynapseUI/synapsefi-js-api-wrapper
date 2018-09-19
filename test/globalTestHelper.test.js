const platformUserApiCannon = require('./testHelper/platformUserApiCannon');
const testHelpersForNodes = require('./testHelper/testHelpersForNodes');

before(async () => {
  try {
    console.log('Set refresh_token');
    await platformUserApiCannon.GET_USER();

    console.log('Set oauth_key');
    await platformUserApiCannon.POST_OAUTH_USER();
  } catch (error) {
    console.log('error: ', error.response.data.error.en);
  }
});

after(async () => {
  try {
    console.log('If there are any node left then delete them.');
    await testHelpersForNodes.deleteAllNodeFromPlatformUser();
  } catch (error) {
    console.log('error: ', error.response.data.error.en);
  }
});
