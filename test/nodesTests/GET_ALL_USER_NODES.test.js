const { expect } = require('chai');

const platformUserApiCannon = require('../testHelper/platformUserApiCannon');
const testHelpersForNodes = require('../testHelper/testHelpersForNodes');

describe('GET_ALL_USER_NODES', () => {
  // - GET_ALL_USER_NODES
  //   - create default node node 1
  //   - create default node node 2
  //   - > get all nodes
  //   - `expect node legnth = 2`
  //   - delete 2 nodes
  it.only('get all one user nodes', async () => {
    try {
      //   const { node_id: node_id_1 } = await testHelpersForNodes.createDepositNode({
      //     nickname: 'NODE 1',
      //   });

      //   const { node_id: node_id_2 } = await testHelpersForNodes.createDepositNode({
      //     nickname: 'NODE 2',
      //   });

      // ---------------------------------------------------------------------------------------
      const { data: { nodes } } = await platformUserApiCannon.GET_ALL_USER_NODES();
      console.log('nodes: ', nodes);
      // console.log('data: ', data);
      // ---------------------------------------------------------------------------------------
      // await platformUserApiCannon.DELETE_NODE({ node_id: node_id_1 });
      // await platformUserApiCannon.DELETE_NODE({ node_id: node_id_2 });
    } catch (error) {
      console.log('error: ', error.response.data.error.en);
    }
  });
});
