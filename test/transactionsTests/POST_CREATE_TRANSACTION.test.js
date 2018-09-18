const { expect } = require('chai');

const platformUserApiCannon = require('../testHelper/platformUserApiCannon');
const testHelpersForNodes = require('../testHelper/testHelpersForNodes');

describe('POST_CREATE_TRANSACTION', () => {
  it('create deposit node', async () => {
    // const { node_id: node_id_1 } = await testHelpersForNodes.createDepositNode({
    //   nickname: 'Node 1',
    // });

    // const { node_id: node_id_2 } = await testHelpersForNodes.createDepositNode({
    //   nickname: 'Node 2',
    // });

    // // -----------------------------------------------------------------------------------------------
    // const { data } = await platformUserApiCannon.POST_CREATE_TRANSACTION({
    //   node_id: node_id_1
    //   reqBody: {
    //     type: 'DEPOSIT-US',
    //     info: {
    //       nickname: 'My Checking',
    //     },
    //   },
    // });
    // // -----------------------------------------------------------------------------------------------

    // console.log('data: ', data);
  });
});
