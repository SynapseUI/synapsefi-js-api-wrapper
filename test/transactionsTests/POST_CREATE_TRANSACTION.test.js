const { expect } = require('chai');

const platformUserApiWrapper = require('../testHelper/platformUserApiWrapper');
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
    try {
      const { data } = await platformUserApiWrapper.POST_CREATE_TRANSACTION({
        from_node_id,
        to_node_id,
        to_node_type,
        amount: 100,
        currency: 'USD',
        optionalBodyParams: {},
      });

      expect(data.from.nickname).to.equal('Node 1');
      expect(data.to.nickname).to.equal('Node 2');
      expect(data.amount.amount).to.equal(100);
    } catch (error) {
      console.log('error: ', error.response.data.error.en);
    }

    // -----------------------------------------------------------------------------------
  });
});
