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

  return { node_id_1, node_id_2 };
};

module.exports = create2NodesForPlatform;
