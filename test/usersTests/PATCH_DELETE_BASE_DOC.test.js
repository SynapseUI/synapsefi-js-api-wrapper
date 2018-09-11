const { expect } = require('chai');

const platformUserApiCannon = require('../testHelper/platformUserApiCannon');
const testHelperFuncs = require('../testHelper/testHelperFuncs');

// - [x] PATCH_DELETE_BASE_DOC
//   - create user
//   - add doc with email "first@gmail.com"
//   - add doc with email "second@gmail.com"
//   - delete first doc
//   - `expect doc len to be 1`
it.only('PATCH_DELETE_BASE_DOC', async () => {
  const { endUserApiCannon } = await testHelperFuncs.createUser();
  await testHelperFuncs.addDocument({ endUserApiCannon, email: 'first@gmail.com' });
  await testHelperFuncs.addDocument({ endUserApiCannon, email: 'second@gmail.com' });
});
