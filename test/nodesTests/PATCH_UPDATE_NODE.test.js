const { expect } = require('chai');

const platformUserApiWrapper = require('../testHelper/platformUserApiWrapper');
const testHelpersForNodes = require('../testHelper/testHelpersForNodes');

describe('PATCH_UPDATE_NODE', () => {
  // - PATCH_UPDATE_NODE
  //   - create node with nickname = "Initial Nickname"
  //   - > update nickname = "Updated Nickname"
  //     - `expect nickname = "Updated Nickname`
  //     - delete node
  it('update nickname of node', async () => {
    const { node_id } = await testHelpersForNodes.createDepositNode({
      nickname: 'Initial Nickname',
    });

    const bodyParams = { nickname: 'Updated Nickname' };
    // ---------------------------------------------------------------------------------------------
    const { data: { info: { nickname } } } = await platformUserApiWrapper.PATCH_UPDATE_NODE({
      node_id,
      bodyParams,
    });
    // ---------------------------------------------------------------------------------------------

    expect(nickname).to.equal('Updated Nickname');

    await platformUserApiWrapper.DELETE_NODE({ node_id });
  });
});
