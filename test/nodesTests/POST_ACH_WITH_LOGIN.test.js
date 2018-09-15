const { expect } = require('chai');

const platformUserApiCannon = require('../testHelper/platformUserApiCannon');
const testHelpersForNodes = require('../testHelper/testHelpersForNodes');

describe('POST_ACH_WITH_LOGIN', () => {
  it('create ach with bank login', async () => {
    // ---------------------------------------------------------------------------------------------
    const { data: { mfa: { access_token } } } = await platformUserApiCannon.POST_ACH_WITH_LOGIN({
      bank_id: 'synapse_good',
      bank_pw: 'test1234',
      bank_name: 'fake',
    });
    // ---------------------------------------------------------------------------------------------
    expect(access_token).to.be.a('string');
  });
});
