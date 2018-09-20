const { expect } = require('chai');
const randomatic = require('randomatic');

const platformUserApiWrapper = require('../testHelper/platformUserApiWrapper');
const testHelpersForNodes = require('../testHelper/testHelpersForNodes');

describe('POST_ACH_WITH_AC_RN', () => {
  // - > create ACH AC / RN -> get node_id
  //   - `expect allowed "CREDIT"`
  //   - `expect type "ACH-US"`
  it('create ach with account and routing number', async () => {
    // ---------------------------------------------------------------------------------------------
    // await platformUserApiWrapper.GET_USER();
    // await platformUserApiWrapper.POST_OAUTH_USER();

    await testHelpersForNodes.deleteAllNodeFromPlatformUser();
    const {
      data: { nodes: { 0: { _id: node_id, allowed } } },
    } = await platformUserApiWrapper.POST_ACH_WITH_AC_RN({
      bodyParams: {
        info: {
          nickname: 'Fake Account',
          account_num: randomatic('0', 13),
          routing_num: '051000017',
          type: 'PERSONAL',
          class: 'CHECKING',
        },
      },
    });
    // ---------------------------------------------------------------------------------------------
    expect(allowed).to.equal('CREDIT');
    await platformUserApiWrapper.DELETE_NODE({ node_id });
  });
});
