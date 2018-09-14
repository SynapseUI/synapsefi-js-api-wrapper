const { expect } = require('chai');

const platformUserApiCannon = require('../testHelper/platformUserApiCannon');
const testHelpersForNodes = require('../testHelper/testHelpersForNodes');

describe('GET_ALL_USER_NODES', () => {
  let node_id;

  beforeEach(async () => {
    const resp1 = await testHelpersForNodes.createDepositNode({
      nickname: 'NODE 1',
    });
    node_id = resp1.node_id;
  });

  afterEach(async () => {
    await platformUserApiCannon.DELETE_NODE({ node_id });
    testHelpersForNodes.deleteAllNodeFromPlatformUser();
  });

  // - create node
  //   - > get node
  //     - `expect node type = "DEPOSIT-US"`
  //     - delete node
  it.only('basic get node', async () => {
    const { data } = await platformUserApiCannon.GET_NODE({ node_id });
    console.log('data: ', data);
  });
});
