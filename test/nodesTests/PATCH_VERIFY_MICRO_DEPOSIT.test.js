const { expect } = require('chai');

const platformUserApiCannon = require('../testHelper/platformUserApiCannon');
const testHelpersForNodes = require('../testHelper/testHelpersForNodes');

describe('PATCH_VERIFY_MICRO_DEPOSIT', () => {
  // - create ACH AC / RN -> get node_id
  // -> resend micro deposit
  // - `expect time line ot have "ACH-US"`
  // - `expect 2 notes of "Micro deposit initiated"`
  it('verify micro deposit', async () => {
    await testHelpersForNodes.deleteAllNodeFromPlatformUser();
    const {
      data: { nodes: { 0: { _id: node_id, allowed: initialAllowed } } },
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

    try {
      // ---------------------------------------------------------------------------------------------
      console.log('initialAllowed: ', initialAllowed);
      const { data: { allowed } } = await platformUserApiCannon.PATCH_VERIFY_MICRO_DEPOSIT({
        node_id,
        micro: [0.1, 0.1],
      });
      // ---------------------------------------------------------------------------------------------
      console.log('allowed: ', allowed);
      await platformUserApiCannon.DELETE_NODE({ node_id });
    } catch (error) {
      console.log('error: ', error.response.data.error.en);
    }
  });
});
