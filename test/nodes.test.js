const { expect } = require('chai');

const reqBodyForCreateNode = require('../sampleData/reqBodyForCreateNode');
const platformApiReqs = require('./platformApiReqs');

const getNodeCount = async () => {
  const { data: { node_count } } = await platformApiReqs.GET_ALL_USER_NODES();
  return node_count;
};

describe('node related', () => {
  xit('create deposit accounts', async () => {
    try {
      const { data } = await platformApiReqs.POST_CREATE_NODE(reqBodyForCreateNode.DEPOSIT_ACCOUNT);
      console.log('data: ', data);
    } catch (error) {
      console.log('error.response.data.error.en: ', error.response.data.error.en);
    }
  });

  it('get all user nodes', async () => {
    const { data } = await platformApiReqs.GET_ALL_USER_NODES();
    expect(typeof data.node_count).to.equal('number');
  });

  it('create deposit node -> delete just created deposit node', async () => {
    const initialNodeCount = await getNodeCount();

    // Create Node
    const { data: { nodes } } = await platformApiReqs.POST_CREATE_NODE({
      type: 'DEPOSIT-US',
      info: {
        nickname: 'My Checking',
      },
    });
    const afterCreationNodeCount = await getNodeCount();
    expect(afterCreationNodeCount).to.equal(initialNodeCount + 1);

    // Delete Node
    await platformApiReqs.DELETE_NODE(nodes[0]._id);
    const afterDeletionNodeCount = await getNodeCount();
    expect(afterDeletionNodeCount).to.equal(afterCreationNodeCount - 1);
  });
});
