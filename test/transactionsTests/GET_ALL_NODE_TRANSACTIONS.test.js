const { expect } = require('chai');

const platformUserApiCannon = require('../testHelper/platformUserApiCannon');
const testHelpersForNodes = require('../testHelper/testHelpersForNodes');
const testHelperFuncsForUsers = require('../testHelper/testHelperFuncsForUsers');

describe('GET_ALL_NODE_TRANSACTIONS', () => {
  it('base and page, per_page all together', async () => {
    const {
      endUserApiCannon: endUserCannon1,
      user_id: user_id_1,
    } = await testHelperFuncsForUsers.createUser({ email: 'user1@email.com' });

    console.log('create user 1');

    const { data: { nodes: { 0: { _id: node_id_1 } } } } = await endUserCannon1.POST_CREATE_NODE({
      bodyParams: {
        type: 'DEPOSIT-US',
        info: {
          nickname: 'NODE 1',
        },
      },
    });

    console.log('node_id_1: ', node_id_1);
    console.log('create node 1');

    const {
      endUserApiCannon: endUserCannon2,
      user_id: user_id_2,
    } = await testHelperFuncsForUsers.createUser({ email: 'user2@email.com' });

    console.log('create user 2');

    const { data: { nodes: { 0: { _id: node_id_2 } } } } = await endUserCannon2.POST_CREATE_NODE({
      bodyParams: {
        type: 'DEPOSIT-US',
        info: {
          nickname: 'NODE 2',
        },
      },
    });

    console.log('node_id_2: ', node_id_2);
    console.log('create node 2');

    const { data: { _id: trans_id_1_2 } } = await endUserCannon1.POST_CREATE_TRANSACTION({
      from_node_id: node_id_1,
      to_node_id: node_id_2,
      to_node_type: 'DEPOSIT-US',
      amount: 100,
      currency: 'USD',
      optionalBodyParams: {},
    });

    console.log('create transaction 1 -> 2 ');

    // -----------------------------------------------------------------------------------
    try {
      const { data: { trans } } = await endUserCannon1.GET_ALL_NODE_TRANSACTIONS({
        node_id: node_id_2,
      });

      expect(trans.length).to.equal(1);

      const { data: { page, limit } } = await endUserCannon1.GET_ALL_NODE_TRANSACTIONS({
        node_id: node_id_2,
        page: 2,
        per_page: 1,
      });

      expect(page).to.equal(2);
      expect(limit).to.equal(1);
    } catch (error) {
      console.log('error: ', error.response.data.error.en);
    }
    // -----------------------------------------------------------------------------------
  });
});
