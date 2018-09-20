const { expect } = require('chai');

const platformUserApiWrapper = require('../testHelper/platformUserApiWrapper');
const testHelpersForNodes = require('../testHelper/testHelpersForNodes');

describe('PATCH_COMMENT_ON_STATUS', () => {
  it('patch comment to timeline', async () => {
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
    const {
      data: { recent_status: firstRecentStatus },
    } = await platformUserApiWrapper.PATCH_COMMENT_ON_STATUS({
      node_id: from_node_id,
      trans_id,
      comment: 'first comment',
    });
    // -----------------------------------------------------------------------------------

    // -----------------------------------------------------------------------------------
    const {
      data: { recent_status: secondRecentStatus },
    } = await platformUserApiWrapper.PATCH_COMMENT_ON_STATUS({
      node_id: from_node_id,
      trans_id,
      comment: 'second comment',
    });
    // -----------------------------------------------------------------------------------

    expect(firstRecentStatus.note).to.equal('Transaction Created. first comment');
    expect(secondRecentStatus.note).to.equal('Transaction Created. first comment second comment');
  });
});
