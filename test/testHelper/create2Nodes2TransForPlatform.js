const platformUserApiWrapper = require('./platformUserApiWrapper');

const create2NodesForPlatform = async () => {
  const { data: dataFromNode1 } = await platformUserApiWrapper.POST_CREATE_NODE({
    bodyParams: { type: 'DEPOSIT-US', info: { nickname: 'DEPOSIT 1' } },
  });

  const { data: dataFromNode2 } = await platformUserApiWrapper.POST_CREATE_NODE({
    bodyParams: { type: 'DEPOSIT-US', info: { nickname: 'DEPOSIT 2' } },
  });

  const node_id_1 = dataFromNode1.nodes[0]._id;
  const node_id_2 = dataFromNode2.nodes[0]._id;

  const { data: dataFromNodeOneToTwo } = await platformUserApiWrapper.POST_CREATE_TRANSACTION({
    from_node_id: node_id_1,
    to_node_id: node_id_2,
    to_node_type: 'DEPOSIT-US',
    amount: 100,
    currency: 'USD',
    optionalBodyParams: {},
  });

  const { data: dataFromNodeTwoToOne } = await platformUserApiWrapper.POST_CREATE_TRANSACTION({
    from_node_id: node_id_2,
    to_node_id: node_id_1,
    to_node_type: 'DEPOSIT-US',
    amount: 100,
    currency: 'USD',
    optionalBodyParams: {},
  });

  const trans_id_1 = dataFromNodeOneToTwo._id;
  const trans_id_2 = dataFromNodeTwoToOne._id;

  return {
    node_id_1,
    node_id_2,
    trans_id_1,
    trans_id_2,
  };
};

module.exports = create2NodesForPlatform;
