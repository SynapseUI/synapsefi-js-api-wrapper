const { expect } = require('chai');
const _ = require('lodash');

const platformUserApiCannon = require('../testHelper/platformUserApiCannon');
const testHelpersForNodes = require('../testHelper/testHelpersForNodes');

describe('POST_ACH_WITH_MFA', () => {
  // POST_ACH_WITH_MFA
  //   - > create ACH with login
  //   - `expect mfa.access_token to be string`
  //   - > create ACH with mfa
  //   - `expect every type = "ACH-US"`
  //   - delete node
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

    const types = nodes.map(({ type }) => type);

    expect(_.every(types, type => type === 'ACH-US')).to.equal(true);

    nodes.forEach(async ({ _id }) => {
      await platformUserApiCannon.DELETE_NODE({ node_id: _id });
    });
  });
});
