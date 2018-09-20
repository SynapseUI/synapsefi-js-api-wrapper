const { expect } = require('chai');

const platformUserApiWrapper = require('../testHelper/platformUserApiWrapper');
const testHelpersForNodes = require('../testHelper/testHelpersForNodes');

describe('DELETE_TRANSACTION', () => {
  it('delete transaction', async () => {
    try {
      const { node_id: from_node_id } = await testHelpersForNodes.createDepositNode({
        nickname: 'Node 1',
      });

      const {
        node_id: to_node_id,
        type: to_node_type,
      } = await testHelpersForNodes.createDepositNode({
        nickname: 'Node 2',
      });

      const { data: { _id: trans_id } } = await platformUserApiWrapper.POST_CREATE_TRANSACTION({
        from_node_id,
        to_node_id,
        to_node_type,
        amount: 100,
        currency: 'USD',
        optionalBodyParams: {},
      });

      // -----------------------------------------------------------------------------------
      const { data: { timeline } } = await platformUserApiWrapper.DELETE_TRANSACTION({
        node_id: from_node_id,
        trans_id,
      });
      // -----------------------------------------------------------------------------------

      expect(timeline[timeline.length - 1].status).to.equal('CANCELED');
    } catch (error) {
      console.log('error: ', error.response.data.error.en);
    }
  });
});
