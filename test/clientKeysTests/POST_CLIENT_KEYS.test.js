const { expect } = require('chai');

const platformUserApiWrapper = require('../testHelper/platformUserApiWrapper');

describe('Post client keys', () => {
  it.only('get client keys', async () => {
    const { data: dataFromPostClientKeys } = await platformUserApiWrapper.POST_CLIENT_KEYS();
    console.log('dataFromPostClientKeys: ', dataFromPostClientKeys);
  });
});
