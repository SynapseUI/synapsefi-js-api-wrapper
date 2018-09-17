const { expect } = require('chai');

const platformUserApiCannon = require('../testHelper/platformUserApiCannon');
const testHelpersForNodes = require('../testHelper/testHelpersForNodes');

describe('PATCH_UPDATE_NODE', () => {
  // - PATCH_UPDATE_NODE
  //   - create node with nickname = "Initial Nickname"
  //   - > update nickname = "Updated Nickname"
  //     - `expect nickname = "Updated Nickname`
  //     - delete node
  it.only('update nickname of node', async () => {
    const { node_id } = await testHelpersForNodes.createDepositNode({
      nickname: 'Initial Nickname',
    });

    const reqBody = { nickname: 'Updated Nickname' };
    // ---------------------------------------------------------------------------------------------
    const { data: { info: { nickname } } } = await platformUserApiCannon.PATCH_UPDATE_NODE({
      node_id,
      reqBody,
    });
    // ---------------------------------------------------------------------------------------------

    expect(nickname).to.equal('Updated Nickname');

    await platformUserApiCannon.DELETE_NODE({ node_id });
  });
});
