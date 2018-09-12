const { expect } = require('chai');

const platformUserApiCannon = require('../testHelper/platformUserApiCannon');
const testHelperFuncs = require('../testHelper/testHelperFuncs');

describe('POST_OAUTH_USER', () => {
  //  - set fake oauth key
  //  - get and set oauth key
  //  - `expect new oauth key should not be fake oauth key`
  it.only('get and set oauth key', async () => {
    platformUserApiCannon.oauth_key = 'fake oauth key';
    console.log('platformUserApiCannon before: ', platformUserApiCannon.oauth_key);

    const { data: { oauth_key } } = await platformUserApiCannon.POST_OAUTH_USER();
    console.log('platformUserApiCannon after: ', platformUserApiCannon.oauth_key);
    console.log('oauth_key: ', oauth_key);
  });
});
