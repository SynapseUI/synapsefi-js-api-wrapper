const { expect } = require('chai');
const platformUserApiWrapper = require('../testHelper/platformUserApiWrapper');
const create2Nodes2TransForPlatform = require('../testHelper/create2Nodes2TransForPlatform');

describe('Get all node transactions with mongo query', () => {
  it('base trans count = 2, filter = 1', async () => {
    const { node_id_1, trans_id_1 } = await create2Nodes2TransForPlatform();

    const { data: respWithoutFilter } = await platformUserApiWrapper.GET_ALL_NODE_TRANSACTIONS({
      node_id: node_id_1,
    });
    const baseTransCount = respWithoutFilter.trans_count;

    const { data: respWithNodeIdFilter } = await platformUserApiWrapper.GET_ALL_NODE_TRANSACTIONS({
      node_id: node_id_1,
      mongoQuery: { _id: trans_id_1 },
    });
    const transCountAfterFilter = respWithNodeIdFilter.trans_count;

    console.log('baseTransCount: ', baseTransCount);
    console.log('transCountAfterFilter: ', transCountAfterFilter);

    expect(baseTransCount).to.equal(2);
    expect(transCountAfterFilter).to.equal(1);
  });
});
