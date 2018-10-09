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

    // ------------------------------------------------------------------
    const { data } = await platformUserApiWrapper.POST_OAUTH_USER();
    console.log('data: ', data);
    // ------------------------------------------------------------------
  });

  xit('three steps to do 2fa with oauth', async () => {
    await platformUserApiWrapper.GET_USER();
    platformUserApiWrapper.fingerprint = 'fake finger print';

    // ---- STEP 1 ------------------------------------------------------
    const { data: stepOneResponse } = await platformUserApiWrapper.POST_OAUTH_USER({
      bodyParams: { refresh_token: platformUserApiWrapper.refresh_token },
    });
    expect(stepOneResponse.error.en).to.equal(
      'Fingerprint not registered. Please perform the MFA flow.'
    );
    // ------------------------------------------------------------------

    // ---- STEP 2 ------------------------------------------------------
    const { data: stepTwoResponse } = await platformUserApiWrapper.POST_OAUTH_USER({
      bodyParams: {
        refresh_token: platformUserApiWrapper.refresh_token,
        phone_number: '3143153242',
      },
    });
    expect(stepTwoResponse.message.en).to.equal('MFA sent to 3143153242.');
    // ------------------------------------------------------------------
  });
});
