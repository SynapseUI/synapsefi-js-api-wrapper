const { expect } = require('chai');

const testHelpersForOauth = require('../testHelper/testHelpersForOauth');
const testHelpersForSubnets = require('../testHelper/testHelpersForSubnets');

describe('three steps to do 2fa with oauth', () => {
  it('three steps to do 2fa with oauth', async () => {
    const { endUserApiWrapper } = await testHelpersForOauth.createEndUserWithNoBaseDoc();
    endUserApiWrapper.fingerprint = 'static_pin';

    // ---- STEP 1 ------------------------------------------------------
    const { data: stepOneResponse } = await endUserApiWrapper
      .POST_OAUTH_USER({
        bodyParams: { refresh_token: endUserApiWrapper.refresh_token },
      })
      .catch(error => {
        console.log('error: ', error);
      });

    expect(stepOneResponse.error.en).to.equal(
      'Fingerprint not registered. Please perform the MFA flow.'
    );
    // ------------------------------------------------------------------

    // ---- STEP 2 ------------------------------------------------------
    const { data: stepTwoResponse } = await endUserApiWrapper.POST_OAUTH_USER({
      bodyParams: {
        refresh_token: endUserApiWrapper.refresh_token,
        phone_number: '123.123.1233',
      },
    });
    expect(stepTwoResponse.message.en).to.equal('MFA sent to 123.123.1233.');
    // ------------------------------------------------------------------

    // ---- STEP 3 ------------------------------------------------------
    const { data: stepThreeResponse } = await endUserApiWrapper
      .POST_OAUTH_USER({
        bodyParams: {
          refresh_token: endUserApiWrapper.refresh_token,
          validation_pin: '123456',
        },
      })
      .catch(error => {
        console.log('error: ', error.response.data.error.en);
      });

    expect(stepThreeResponse.oauth_key !== undefined).to.equal(true);
    // ------------------------------------------------------------------

    testHelpersForSubnets.removeEndUser({ endUserApiWrapper });
  });
});
