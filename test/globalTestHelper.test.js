const platformUserApiWrapper = require('./testHelper/platformUserApiWrapper');
const testHelpersForNodes = require('./testHelper/testHelpersForNodes');

before(async () => {
  try {
    console.log('Set refresh_token');
    await platformUserApiWrapper.GET_USER();

    console.log('Set oauth_key');
    await platformUserApiWrapper.POST_OAUTH_USER();
  } catch (error) {
    console.log('error: ', error.response.data.error.en);
  }
});

after(async () => {
  try {
    await testHelpersForNodes.deleteAllNodeFromPlatformUser();
  } catch (error) {
    console.log('error: ', error.response.data.error.en);
  }
});
