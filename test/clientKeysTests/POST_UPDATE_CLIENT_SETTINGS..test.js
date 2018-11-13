const { expect } = require('chai');

const platformUserApiWrapper = require('../testHelper/platformUserApiWrapper');

describe('Post update client settings', () => {
  xit('update client settings', async () => {
    const {
      data: dataFromUpdateClientSetting,
    } = await platformUserApiWrapper.POST_UPDATE_CLIENT_SETTINGS({
      bodyParams: {
        contact_name: 'yeah',
        contact_info: 'yeah',
        url: 'yeah',
        phone_number: 'yeah',
        terms: 'yeah',
      },
    });
    console.log('dataFromUpdateClientSetting: ', dataFromUpdateClientSetting);
  });
});
