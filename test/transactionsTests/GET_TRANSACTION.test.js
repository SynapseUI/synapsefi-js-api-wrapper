const { expect } = require('chai');

const platformUserApiCannon = require('../testHelper/platformUserApiCannon');
const testHelpersForNodes = require('../testHelper/testHelpersForNodes');

describe('GET_TRANSACTION', () => {
  it.only('get transaction with from_node_id and to_node_id', async () => {
    const { node_id: from_node_id } = await testHelpersForNodes.createDepositNode({
      nickname: 'Node 1',
    });

    const {
      node_id: to_node_id,
      type: to_node_type,
    } = await testHelpersForNodes.createDepositNode({
      nickname: 'Node 2',
    });

    const { data: { _id: trans_id } } = await platformUserApiCannon.POST_CREATE_TRANSACTION({
      from_node_id,
      to_node_id,
      to_node_type,
      amount: 100,
      currency: 'USD',
      optionalBodyParams: {},
    });

    // -----------------------------------------------------------------------------------
    const { data: dataWithFromNodeId } = await platformUserApiCannon.GET_TRANSACTION({
      node_id: from_node_id,
      trans_id,
    });
    // -----------------------------------------------------------------------------------

    expect(dataWithFromNodeId.from.nickname).to.equal('Node 1');
    expect(dataWithFromNodeId.to.nickname).to.equal('Node 2');
    expect(dataWithFromNodeId.amount.amount).to.equal(100);

    await testHelpersForNodes.deleteAllNodeFromPlatformUser();

    // -----------------------------------------------------------------------------------
    const { data: dataWithToNodeId } = await platformUserApiCannon.GET_TRANSACTION({
      node_id: to_node_id,
      trans_id,
    });
    // -----------------------------------------------------------------------------------

    expect(dataWithToNodeId.from.nickname).to.equal('Node 1');
    expect(dataWithToNodeId.to.nickname).to.equal('Node 2');
    expect(dataWithToNodeId.amount.amount).to.equal(100);
  });
});
