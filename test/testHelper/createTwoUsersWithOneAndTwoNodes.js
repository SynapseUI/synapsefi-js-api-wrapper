const testHelperFuncsForUsers = require('./testHelperFuncsForUsers');

const createTwoUsersWithOneAndTwoNodes = async () => {
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

  const {
    data: { nodes: { 0: { _id: node_id_2 } } },
  } = await endUserApiWrapper_1.POST_CREATE_NODE({
    bodyParams: {
      type: 'DEPOSIT-US',
      info: {
        nickname: 'Node 1',
      },
    },
  });

  const {
    data: { nodes: { 0: { _id: node_id_3 } } },
  } = await endUserApiWrapper_2.POST_CREATE_NODE({
    bodyParams: {
      type: 'DEPOSIT-US',
      info: {
        nickname: 'Node 1',
      },
    },
  });

  // -----------------------------------------------------------

  const output = {
    endUserApiWrapper_1,
    endUserApiWrapper_2,
    user_id_1,
    user_id_2,
    node_id_1,
    node_id_2,
    node_id_3,
  };

  return output;
};

module.exports = createTwoUsersWithOneAndTwoNodes;
