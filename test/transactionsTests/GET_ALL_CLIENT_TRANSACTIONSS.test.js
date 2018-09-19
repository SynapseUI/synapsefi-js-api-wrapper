const { expect } = require('chai');

const platformUserApiCannon = require('../testHelper/platformUserApiCannon');
const testHelpersForNodes = require('../testHelper/testHelpersForNodes');
const testHelperFuncsForUsers = require('../testHelper/testHelperFuncsForUsers');

describe('GET_ALL_CLIENT_TRANSACTIONS', () => {
  // - create user 1 -> create node 1
  // - create user 2 -> create node 2
  // - create node for platform
  // - make transaction from platform node to user 1 node
  // - make transaction from user 1 node 1 to user 2 node 2
  it.only('test', async () => {
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

    const {
      data: { nodes: { 0: { _id: node_id_platform } } },
    } = await platformUserApiCannon.POST_CREATE_NODE({
      bodyParams: {
        type: 'DEPOSIT-US',
        info: {
          nickname: 'NODE PLATFORM',
        },
      },
    });

    console.log('node_id_platform: ', node_id_platform);
    console.log('create node platform');

    const { data: { _id: trans_id_1_2 } } = await endUserCannon1.POST_CREATE_TRANSACTION({
      from_node_id: node_id_1,
      to_node_id: node_id_2,
      to_node_type: 'DEPOSIT-US',
      amount: 100,
      currency: 'USD',
      optionalBodyParams: {},
    });

    console.log('create transaction 1 -> 2 ');

    const { data: { _id: trans_id_2_platform } } = await endUserCannon2.POST_CREATE_TRANSACTION({
      from_node_id: node_id_2,
      to_node_id: node_id_platform,
      to_node_type: 'DEPOSIT-US',
      amount: 200,
      currency: 'USD',
      optionalBodyParams: {},
    });

    console.log('create transaction 2 -> platform ');

    try {
      const { data } = await platformUserApiCannon.GET_ALL_CLIENT_TRANSACTIONS();
      console.log('data: ', data);
    } catch (error) {
      console.log('error: ', error.response.data.error.en);
    }
  });
});
