const { expect } = require('chai');

const platformUserApiWrapper = require('../testHelper/platformUserApiWrapper');
const getUserNodeTransIds = require('../testHelper/getUserNodeTransIds');

describe('GET_ALL_CLIENT_TRANSACTIONS with mongoQuery', () => {
  let userIds;
  let nodeIds;
  let transIds;

  before(async () => {
    let userNodeTransIds = await getUserNodeTransIds();
    userIds = userNodeTransIds.userIds;
    nodeIds = userNodeTransIds.nodeIds;
    transIds = userNodeTransIds.transIds;
  });

  it('by user_id', async () => {
    try {
      const {
        data: { trans_count: user_1_trans_count },
      } = await platformUserApiWrapper.GET_ALL_CLIENT_TRANSACTIONS({
        mongoQuery: {
          $or: [{ 'from.user._id': userIds[0] }, { 'to.user._id': userIds[0] }],
        },
      });

      const {
        data: { trans_count: user_2_trans_count },
      } = await platformUserApiWrapper.GET_ALL_CLIENT_TRANSACTIONS({
        mongoQuery: {
          $or: [{ 'from.user._id': userIds[1] }, { 'to.user._id': userIds[1] }],
        },
      });

      const {
        data: { trans_count: user_3_trans_count },
      } = await platformUserApiWrapper.GET_ALL_CLIENT_TRANSACTIONS({
        mongoQuery: {
          $or: [{ 'from.user._id': userIds[2] }, { 'to.user._id': userIds[2] }],
        },
      });

      expect(user_1_trans_count).to.equal(3);
      expect(user_2_trans_count).to.equal(1);
      expect(user_3_trans_count).to.equal(2);
    } catch (error) {
      console.log('error: ', error.response.data.error.en);
      throw new Error(error);
    }
  });

  it('by node_id', async () => {
    try {
      const {
        data: { trans_count: node_2_trans_count },
      } = await platformUserApiWrapper.GET_ALL_CLIENT_TRANSACTIONS({
        mongoQuery: {
          $or: [{ 'from.id': nodeIds[1] }, { 'to.id': nodeIds[1] }],
        },
      });

      const {
        data: { trans_count: node_3_trans_count },
      } = await platformUserApiWrapper.GET_ALL_CLIENT_TRANSACTIONS({
        mongoQuery: {
          $or: [{ 'from.id': nodeIds[2] }, { 'to.id': nodeIds[2] }],
        },
      });

      const {
        data: { trans_count: node_4_trans_count },
      } = await platformUserApiWrapper.GET_ALL_CLIENT_TRANSACTIONS({
        mongoQuery: {
          $or: [{ 'from.id': nodeIds[3] }, { 'to.id': nodeIds[3] }],
        },
      });

      expect(node_2_trans_count).to.equal(1);
      expect(node_3_trans_count).to.equal(2);
      expect(node_4_trans_count).to.equal(2);
    } catch (error) {
      console.log('error: ', error.response.data.error.en);
      throw new Error(error);
    }
  });

  it('by trans_id', async () => {
    try {
      const {
        data: { trans_count: valid_trans_count },
      } = await platformUserApiWrapper.GET_ALL_CLIENT_TRANSACTIONS({
        mongoQuery: { _id: transIds[0] },
      });
      const {
        data: { trans_count: invalid_trans_count },
      } = await platformUserApiWrapper.GET_ALL_CLIENT_TRANSACTIONS({
        mongoQuery: { _id: nodeIds[0] },
      });

      expect(valid_trans_count).to.equal(1);
      expect(invalid_trans_count).to.equal(0);
    } catch (error) {
      console.log('error: ', error.response.data.error.en);
      throw new Error(error);
    }
  });
});
