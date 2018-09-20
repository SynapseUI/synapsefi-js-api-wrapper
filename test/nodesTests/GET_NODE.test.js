const { expect } = require('chai');

const platformUserApiWrapper = require('../testHelper/platformUserApiWrapper');
const testHelpersForNodes = require('../testHelper/testHelpersForNodes');

describe('GET_NODE', () => {
  let node_id;

  beforeEach(async () => {
    const resp1 = await testHelpersForNodes.createDepositNode({
      nickname: 'NODE 1',
    });
    node_id = resp1.node_id;
  });

  afterEach(async () => {
    await platformUserApiWrapper.DELETE_NODE({ node_id });
    testHelpersForNodes.deleteAllNodeFromPlatformUser();
  });

  // - create node
  //   - > get node
  //     - `expect node type = "DEPOSIT-US"`
  //     - delete node
  it('get node', async () => {
    const { data: { nodes: { 0: { type } } } } = await platformUserApiWrapper.GET_NODE({ node_id });
    expect(type).to.equal('DEPOSIT-US');
  });
});
