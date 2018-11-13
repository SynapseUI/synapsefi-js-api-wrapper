const { expect } = require('chai');

const platformUserApiWrapper = require('../testHelper/platformUserApiWrapper');

describe('Post client keys', () => {
  xit('get client keys', async () => {
    const {
      data: dataFromPostClientKeys,
    } = await platformUserApiWrapper.POST_GET_CLIENT_SETTINGS();
    console.log('dataFromPostClientKeys: ', dataFromPostClientKeys);
  });
});
