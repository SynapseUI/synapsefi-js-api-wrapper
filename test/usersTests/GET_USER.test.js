const { expect } = require('chai');

const platformUserApiCannon = require('../testHelper/platformUserApiCannon');
const testHelperFuncsForUsers = require('../testHelper/testHelperFuncsForUsers');

// -[x] GET_USER
//   - create user legal_name with "Get User"
//   - `expect get user to have response with legal name "Get User"`
it('GET_USER', async () => {
  const { endUserApiCannon } = await testHelperFuncsForUsers.createUser({ legal_names: ['Get User'] });

  const {
    data: { users_count: user_counts1 },
  } = await platformUserApiCannon.GET_ALL_CLIENT_USERS();
  console.log('user_counts1: ', user_counts1);

  const { data: { legal_names } } = await endUserApiCannon.GET_USER();
  console.log('legal_names: ', legal_names);

  await testHelperFuncsForUsers.deleteMySelf(endUserApiCannon);

  const {
    data: { users_count: user_counts2 },
  } = await platformUserApiCannon.GET_ALL_CLIENT_USERS();
  console.log('user_counts2: ', user_counts2);
});
