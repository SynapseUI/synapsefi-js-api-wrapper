const { expect } = require('chai');
const randomatic = require('randomatic');

const platformUserApiWrapper = require('../testHelper/platformUserApiWrapper');
const testHelpersForNodes = require('../testHelper/testHelpersForNodes');

describe('PATCH_REINITIATE_MICRO_DEPOSIT', () => {
  // - > create ACH AC / RN -> get node_id
  //   - `expect allowed "CREDIT"`
  //   - `expect type "ACH-US"`
  it('re initiate micro deposit', async () => {
    await testHelpersForNodes.deleteAllNodeFromPlatformUser();
    const {
      data: { nodes: { 0: { _id: node_id } } },
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
    const { data: { timeline } } = await platformUserApiWrapper.PATCH_REINITIATE_MICRO_DEPOSIT({
      node_id,
    });
    // ---------------------------------------------------------------------------------------------

    const nodes = timeline.map(({ note }) => note);

    expect(nodes[nodes.length - 1]).to.equal('Micro deposits initiated.');

    await platformUserApiWrapper.DELETE_NODE({ node_id });
  });
});
