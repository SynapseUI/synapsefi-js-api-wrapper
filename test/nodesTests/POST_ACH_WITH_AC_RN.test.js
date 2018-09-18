const { expect } = require('chai');

const platformUserApiCannon = require('../testHelper/platformUserApiCannon');
const testHelpersForNodes = require('../testHelper/testHelpersForNodes');

describe('POST_ACH_WITH_AC_RN', () => {
  // - > create ACH AC / RN -> get node_id
  //   - `expect allowed "CREDIT"`
  //   - `expect type "ACH-US"`
  xit('create ach with account and routing number', async () => {
    // ---------------------------------------------------------------------------------------------
    // await platformUserApiCannon.GET_USER();
    // await platformUserApiCannon.POST_OAUTH_USER();

    await testHelpersForNodes.deleteAllNodeFromPlatformUser();
    const {
      data: { nodes: { 0: { _id: node_id, allowed } } },
    } = await platformUserApiCannon.POST_ACH_WITH_AC_RN({
      reqBody: {
        info: {
          nickname: 'Fake Account',
          account_num: '1232225674134',
          routing_num: '051000017',
          type: 'PERSONAL',
          class: 'CHECKING',
        },
      },
    });
    // ---------------------------------------------------------------------------------------------
    expect(allowed).to.equal('CREDIT')
    await platformUserApiCannon.DELETE_NODE({ node_id });
  });
});
