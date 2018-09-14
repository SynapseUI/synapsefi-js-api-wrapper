// helper
//   - create deposit node with (nickname)

const platformUserApiCannon = require('./platformUserApiCannon');

module.exports.createDepositNode = async (obj = { nickname: 'Default Deposit Node' }) => {
  const { nickname } = obj;
  const {
    data: { nodes: { 0: { _id: node_id, timeline: initialTimeline } } },
  } = await platformUserApiCannon.POST_CREATE_NODE({
    reqBody: {
      type: 'DEPOSIT-US',
      info: { nickname },
    },
  });

  return { node_id, initialTimeline };
};

module.exports.deleteAllNodeFromPlatformUser = async () => {
  const { data: { nodes } } = await platformUserApiCannon.GET_ALL_USER_NODES();
  nodes.forEach(async ({ _id }) => {
    console.log('_id: ', _id);
    await platformUserApiCannon.DELETE_NODE({ node_id: _id });
  });
};
