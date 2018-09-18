const { expect } = require('chai');
const randomatic = require('randomatic');

const platformUserApiCannon = require('../testHelper/platformUserApiCannon');
const testHelpersForNodes = require('../testHelper/testHelpersForNodes');

describe('PATCH_REINITIATE_MICRO_DEPOSIT', () => {
  // - > create ACH AC / RN -> get node_id
  //   - `expect allowed "CREDIT"`
  //   - `expect type "ACH-US"`
  it.only('re initiate micro deposit', async () => {
    await testHelpersForNodes.deleteAllNodeFromPlatformUser();
    const {
      data: { nodes: { 0: { _id: node_id } } },
    } = await platformUserApiCannon.POST_ACH_WITH_AC_RN({
      reqBody: {
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
    const { data: { timeline } } = await platformUserApiCannon.PATCH_REINITIATE_MICRO_DEPOSIT({
      node_id,
    });

    const nodes = timeline.map(({ note }) => note);

    expect(nodes.length).to.equal(3);
    expect(nodes[0]).to.equal('Node created.');
    expect(nodes[1]).to.equal('Micro deposits initiated.');
    expect(nodes[2]).to.equal('Micro deposits initiated.');

    await platformUserApiCannon.DELETE_NODE({ node_id });
    // ---------------------------------------------------------------------------------------------
  });
});
