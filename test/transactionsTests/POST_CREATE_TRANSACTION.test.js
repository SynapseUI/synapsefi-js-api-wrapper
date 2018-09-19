const { expect } = require('chai');

const platformUserApiCannon = require('../testHelper/platformUserApiCannon');
const testHelpersForNodes = require('../testHelper/testHelpersForNodes');

describe('POST_CREATE_TRANSACTION', () => {
  it.only('create transaction', async () => {
    const { node_id: from_node_id } = await testHelpersForNodes.createDepositNode({
      nickname: 'Node 1',
    });

    const {
      node_id: to_node_id,
      type: to_node_type,
    } = await testHelpersForNodes.createDepositNode({
      nickname: 'Node 2',
    });

    // -----------------------------------------------------------------------------------
    const { data } = await platformUserApiCannon.POST_CREATE_TRANSACTION({
      from_node_id,
      to_node_id,
      to_node_type,
      amount: '100',
      currency: 'USD',
      optionalBodyParams: {},
    });
    // -----------------------------------------------------------------------------------

    console.log('data: ', data);
  });
});
