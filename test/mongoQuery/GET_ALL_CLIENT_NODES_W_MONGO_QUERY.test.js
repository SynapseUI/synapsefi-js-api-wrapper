const { expect } = require('chai');

const platformUserApiWrapper = require('../testHelper/platformUserApiWrapper');
const createTwoUsersWithOneAndTwoNodes = require('../testHelper/createTwoUsersWithOneAndTwoNodes');

describe('GET_ALL_CLIENT_NODES with mongoQuery', () => {
  let usersAndNodeIds;
  before(async () => {
    usersAndNodeIds = await createTwoUsersWithOneAndTwoNodes();
  });

  after(async () => {
    const {
      endUserApiWrapper_1,
      endUserApiWrapper_2,
      node_id_1,
      node_id_2,
      node_id_3,
    } = usersAndNodeIds;
    await endUserApiWrapper_1.DELETE_NODE({ node_id: node_id_1 });
    await endUserApiWrapper_1.DELETE_NODE({ node_id: node_id_2 });
    await endUserApiWrapper_2.DELETE_NODE({ node_id: node_id_3 });

    await endUserApiWrapper_1.PATCH_USER_PERMISSION({ permission: 'MAKE-IT-GO-AWAY' });
    await endUserApiWrapper_2.PATCH_USER_PERMISSION({ permission: 'MAKE-IT-GO-AWAY' });
  });

  it('by user_id', async () => {
    try {
      const { user_id_1, user_id_2 } = usersAndNodeIds;

      const {
        data: { node_count: user_1_node_count },
      } = await platformUserApiWrapper.GET_ALL_CLIENT_NODES({
        mongoQuery: { user_id: user_id_1 },
      });

      const {
        data: { node_count: user_2_node_count },
      } = await platformUserApiWrapper.GET_ALL_CLIENT_NODES({
        mongoQuery: { user_id: user_id_2 },
      });
      console.log('user_1_node_count: ', user_1_node_count);
      console.log('user_2_node_count: ', user_2_node_count);
    } catch (error) {
      throw new Error(error);
    }
  });

  it('by node_id', async () => {
    try {
      const { node_id_1 } = usersAndNodeIds;

      const { data: { node_count } } = await platformUserApiWrapper.GET_ALL_CLIENT_NODES({
        mongoQuery: { _id: node_id_1 },
      });

      console.log('node_count: ', node_count);
    } catch (error) {
      throw new Error(error);
    }
  });
});
