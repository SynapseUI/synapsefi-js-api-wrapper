// helper
//   - create deposit node with (nickname)

const platformUserApiWrapper = require('./platformUserApiWrapper');

module.exports.createDepositNode = async (obj = { nickname: 'Default Deposit Node' }) => {
  const { nickname } = obj;
  const {
    data: { nodes: { 0: { _id: node_id, timeline: initialTimeline, type } } },
  } = await platformUserApiWrapper.POST_CREATE_NODE({
    bodyParams: {
      type: 'DEPOSIT-US',
      info: { nickname },
    },
  });

  return { node_id, initialTimeline, type };
};

module.exports.deleteAllNodeFromPlatformUser = async () => {
  const { data: { nodes } } = await platformUserApiWrapper.GET_ALL_USER_NODES();
  nodes.forEach(async ({ _id }) => {
    console.log('_id: ', _id);
    await platformUserApiWrapper.DELETE_NODE({ node_id: _id });
  });
};
