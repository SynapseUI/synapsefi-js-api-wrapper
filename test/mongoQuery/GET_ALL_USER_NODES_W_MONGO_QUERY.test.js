const { expect } = require('chai');
const platformUserApiWrapper = require('../testHelper/platformUserApiWrapper');
const create2NodesForPlatform = require('../testHelper/create2NodesForPlatform');

describe('Get all user nodes with mongo query', () => {
  it.only('base nodec count = 2, with filter = 1', async () => {
    const { node_id_1, node_id_2 } = await create2NodesForPlatform();

    const { data: respWithoutFilter } = await platformUserApiWrapper.GET_ALL_USER_NODES();
    const baseNodeCount = respWithoutFilter.node_count;

    const { data: respWithNodeIdFilter } = await platformUserApiWrapper.GET_ALL_USER_NODES({
      mongoQuery: { _id: node_id_1 },
    });
    const nodeCountAfterFilter = respWithNodeIdFilter.node_count;

    expect(baseNodeCount).to.equal(2);
    expect(nodeCountAfterFilter).to.equal(1);
  });
});
