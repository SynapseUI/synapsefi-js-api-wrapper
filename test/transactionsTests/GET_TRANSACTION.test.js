// const { expect } = require('chai');

// const platformUserApiCannon = require('../testHelper/platformUserApiCannon');
// const testHelpersForNodes = require('../testHelper/testHelpersForNodes');

// describe('GET_TRANSACTION', () => {
//   it('get transaction', async () => {
//     const { node_id: from_node_id } = await testHelpersForNodes.createDepositNode({
//       nickname: 'Node 1',
//     });

//     const {
//       node_id: to_node_id,
//       type: to_node_type,
//     } = await testHelpersForNodes.createDepositNode({
//       nickname: 'Node 2',
//     });

//     const { _id: trans_id } = await platformUserApiCannon.POST_CREATE_TRANSACTION({
//       from_node_id,
//       to_node_id,
//       to_node_type,
//       amount: 100,
//       currency: 'USD',
//       optionalBodyParams: {},
//     });

//     // -----------------------------------------------------------------------------------
//     const { data } = await platformUserApiCannon.GET_TRANSACTION({
//       from_node_id,
//       to_node_id,
//       to_node_type,
//       amount: 100,
//       currency: 'USD',
//       optionalBodyParams: {},
//     });
//     // -----------------------------------------------------------------------------------

//     expect(data.from.nickname).to.equal('Node 1');
//     expect(data.to.nickname).to.equal('Node 2');
//     expect(data.amount.amount).to.equal(100);
//   });
// });
