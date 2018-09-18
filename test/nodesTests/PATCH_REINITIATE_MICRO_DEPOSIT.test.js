const { expect } = require('chai');

const platformUserApiCannon = require('../testHelper/platformUserApiCannon');
const testHelpersForNodes = require('../testHelper/testHelpersForNodes');

describe('PATCH_REINITIATE_MICRO_DEPOSIT', () => {
  // - > create ACH AC / RN -> get node_id
  //   - `expect allowed "CREDIT"`
  //   - `expect type "ACH-US"`
  xit('re initiate micro deposit', async () => {
    // ---------------------------------------------------------------------------------------------
    // await platformUserApiCannon.GET_USER();
    // await platformUserApiCannon.POST_OAUTH_USER();

    await testHelpersForNodes.deleteAllNodeFromPlatformUser();
    const {
      data: { nodes: { 0: { _id: node_id, timeline: initialTimeline } } },
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
    console.log('initialTimeline: ', initialTimeline);

    try {
      const { data: { timeline } } = await platformUserApiCannon.PATCH_REINITIATE_MICRO_DEPOSIT({
        node_id,
      });
      console.log('timeline: ', timeline);
      await platformUserApiCannon.DELETE_NODE({ node_id });
    } catch (error) {
      console.log('error: ', error.response.data.error.en);
    }
  });
});
