const { expect } = require('chai');

const platformUserApiCannon = require('../testHelper/platformUserApiCannon');
const testHelpersForNodes = require('../testHelper/testHelpersForNodes');
const testHelperFuncsForUsers = require('../testHelper/testHelperFuncsForUsers');

// describe('GET_ALL_CLIENT_TRANSACTIONSS.test', () => {
//   // - create user 1 -> create node 1
//   // - create user 2 -> create node 2
//   // - create node for platform
//   // - make transaction from platform node to user 1 node
//   // - make transaction from user 1 node 1 to user 2 node 2
//   it('test', async () => {
//     const {
//       endUserApiCannon: endUserCannon1,
//       user_id: user_id_1,
//     } = await testHelperFuncsForUsers.createUser({ email: 'user1@email.com' });

//     endUserCannon1.POST_CREATE_NODE({ bodyParams: })

//     const {
//       endUserApiCannon: endUserCannon2,
//       user_id: user_id_2,
//     } = await testHelperFuncsForUsers.createUser({ email: 'user2@email.com' });
//   });
// });
