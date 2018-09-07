const { expect } = require('chai');
const ApiFactory = require('../../sampleApiReqs/ApiFactory');

const platformUserApiCannon = require('../testHelper/platformUserApiCannon');

const testHelperFuncs = require('./testHelperFuncs');

describe('test helper functions', () => {
  // create user
  it.only('create user then delete user', async () => {
    try {
      const { endUserApiCannon } = await testHelperFuncs.createUser();
      const resBeforeDelete = await platformUserApiCannon.GET_USERS();
      const userCountBeforeDelete = resBeforeDelete.data.users_count;

      await endUserApiCannon.PATCH_USER_PERMISSION({
        permissionStr: 'MAKE-IT-GO-AWAY',
      });

      const resAfterDelete = await platformUserApiCannon.GET_USERS();
      const userCountAfterDelete = resAfterDelete.data.users_count;

      expect(userCountBeforeDelete - userCountAfterDelete).to.equal(1);
    } catch (error) {
      console.log('error: ', error.response.data.error.en);
    }
  });

  // add document
});
