const { expect } = require('chai');

const platformUserApiCannon = require('../testHelper/platformUserApiCannon');
const testHelperFuncsForUsers = require('../testHelper/testHelperFuncsForUsers');

describe('POST_OAUTH_USER', () => {
  //  - set fake oauth key
  //  - get and set oauth key
  //  - `expect new oauth key should not be fake oauth key`
  xit('get and set oauth key', async () => {
    platformUserApiCannon.oauth_key = 'fake oauth key';
    console.log('platformUserApiCannon before: ', platformUserApiCannon.oauth_key);

    const { data } = await platformUserApiCannon.POST_OAUTH_USER();
    console.log('data: ', data);
  });
});
