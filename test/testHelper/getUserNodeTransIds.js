const testHelperFuncsForUsers = require('./testHelperFuncsForUsers');

const getUserNodeTransIds = async () => {
  const {
    endUserApiWrapper: endUserApiWrapper_1,
    user_id: user_id_1,
  } = await testHelperFuncsForUsers.createUser({
    legal_names: ['User 1'],
  });
  const {
    endUserApiWrapper: endUserApiWrapper_2,
    user_id: user_id_2,
  } = await testHelperFuncsForUsers.createUser({
    legal_names: ['User 2'],
  });
  const {
    endUserApiWrapper: endUserApiWrapper_3,
    user_id: user_id_3,
  } = await testHelperFuncsForUsers.createUser({
    legal_names: ['User 3'],
  });
  const {
    endUserApiWrapper: endUserApiWrapper_4,
    user_id: user_id_4,
  } = await testHelperFuncsForUsers.createUser({
    legal_names: ['User 4'],
  });

  // -----------------------------------------------------------

  const {
    data: { nodes: { 0: { _id: node_id_1 } } },
  } = await endUserApiWrapper_1.POST_CREATE_NODE({
    bodyParams: {
      type: 'DEPOSIT-US',
      info: {
        nickname: 'Node 1',
      },
    },
  });

  await endUserApiWrapper_1.POST_CREATE_NODE({
    bodyParams: {
      type: 'DEPOSIT-US',
      info: {
        nickname: 'Node 1 Extra',
      },
    },
  });

  const {
    data: { nodes: { 0: { _id: node_id_2 } } },
  } = await endUserApiWrapper_2.POST_CREATE_NODE({
    bodyParams: {
      type: 'DEPOSIT-US',
      info: {
        nickname: 'Node 2',
      },
    },
  });

  const {
    data: { nodes: { 0: { _id: node_id_3 } } },
  } = await endUserApiWrapper_3.POST_CREATE_NODE({
    bodyParams: {
      type: 'DEPOSIT-US',
      info: {
        nickname: 'Node 3',
      },
    },
  });

  const {
    data: { nodes: { 0: { _id: node_id_4 } } },
  } = await endUserApiWrapper_4.POST_CREATE_NODE({
    bodyParams: {
      type: 'DEPOSIT-US',
      info: {
        nickname: 'Node 4',
      },
    },
  });

  // -----------------------------------------------------------

  const { data: { _id: trans_id_1__1_2 } } = await endUserApiWrapper_1.POST_CREATE_TRANSACTION({
    from_node_id: node_id_1,
    to_node_id: node_id_2,
    to_node_type: 'DEPOSIT-US',
    amount: 100,
    currency: 'USD',
  });

  const { data: { _id: trans_id_2__1_4 } } = await endUserApiWrapper_1.POST_CREATE_TRANSACTION({
    from_node_id: node_id_1,
    to_node_id: node_id_4,
    to_node_type: 'DEPOSIT-US',
    amount: 100,
    currency: 'USD',
  });

  const { data: { _id: trans_id_3__3_1 } } = await endUserApiWrapper_3.POST_CREATE_TRANSACTION({
    from_node_id: node_id_3,
    to_node_id: node_id_1,
    to_node_type: 'DEPOSIT-US',
    amount: 100,
    currency: 'USD',
  });

  const { data: { _id: trans_id_4__3_4 } } = await endUserApiWrapper_3.POST_CREATE_TRANSACTION({
    from_node_id: node_id_3,
    to_node_id: node_id_4,
    to_node_type: 'DEPOSIT-US',
    amount: 100,
    currency: 'USD',
  });

  // -----------------------------------------------------------

  const ouput = {
    userIds: [user_id_1, user_id_2, user_id_3, user_id_4],
    nodeIds: [node_id_1, node_id_2, node_id_3, node_id_4],
    transIds: [trans_id_1__1_2, trans_id_2__1_4, trans_id_3__3_1, trans_id_4__3_4],
  };

  console.log('ouput: ', ouput);

  return ouput;
};

module.exports = getUserNodeTransIds;
