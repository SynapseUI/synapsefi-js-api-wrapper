const { expect } = require('chai');
const randomatic = require('randomatic');
const _ = require('lodash');

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
    const { data: dataFromPostAchWithAcRn } = await platformUserApiWrapper.POST_ACH_WITH_AC_RN({
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

    const info = _.get(dataFromPostAchWithAcRn, 'nodes.0.info');
    const allowed = _.get(dataFromPostAchWithAcRn, 'nodes.0.allowed');
    const node_id = _.get(dataFromPostAchWithAcRn, 'nodes.0._id');
    // -------------------------ß--------------------------------------------------------------------
    expect(allowed).to.equal('CREDIT');
    await platformUserApiWrapper.DELETE_NODE({ node_id });
  });
});
