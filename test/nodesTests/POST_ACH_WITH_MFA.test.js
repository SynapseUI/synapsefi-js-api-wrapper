const { expect } = require('chai');

const platformUserApiCannon = require('../testHelper/platformUserApiCannon');
const testHelpersForNodes = require('../testHelper/testHelpersForNodes');

describe('POST_ACH_WITH_MFA', () => {
  it.only('create ach with mfa', async () => {
    const { data: { mfa: { access_token } } } = await platformUserApiCannon.POST_ACH_WITH_LOGIN({
      bank_id: 'synapse_good',
      bank_pw: 'test1234',
      bank_name: 'fake',
    });

    // ---------------------------------------------------------------------------------------------
    const { data: { nodes } } = await platformUserApiCannon.POST_ACH_WITH_MFA({
      access_token,
      mfa_answer: 'test_answer',
    });
    // ---------------------------------------------------------------------------------------------

    console.log('allowed: ', nodes[0].allowed);
    console.log('type: ', nodes[0].type);

    nodes.forEach(async ({ _id }) => {
      console.log('_id: ', _id);
      await platformUserApiCannon.DELETE_NODE({ node_id: _id });
    });
  });
});
