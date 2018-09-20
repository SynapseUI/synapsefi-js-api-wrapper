const { expect } = require('chai');

const platformUserApiWrapper = require('../testHelper/platformUserApiWrapper');
const testHelperFuncsForUsers = require('../testHelper/testHelperFuncsForUsers');

describe('POST_OAUTH_USER', () => {
  //  - set fake oauth key
  //  - get and set oauth key
  //  - `expect new oauth key should not be fake oauth key`
  xit('get and set oauth key', async () => {
    platformUserApiWrapper.oauth_key = 'fake oauth key';
    console.log('platformUserApiWrapper before: ', platformUserApiWrapper.oauth_key);

    const { data } = await platformUserApiWrapper.POST_OAUTH_USER();
    console.log('data: ', data);
  });
});
