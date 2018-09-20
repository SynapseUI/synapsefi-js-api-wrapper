const { expect } = require('chai');

const platformUserApiWrapper = require('../testHelper/platformUserApiWrapper');

const testHelperFuncsForUsers = require('./testHelperFuncsForUsers');

describe('test helper functions', () => {
  // create user
  it('create user then delete user', async () => {
    try {
      const { endUserApiWrapper } = await testHelperFuncsForUsers.createUser();
      const resBeforeDelete = await platformUserApiWrapper.GET_ALL_CLIENT_USERS();
      const userCountBeforeDelete = resBeforeDelete.data.users_count;

      await testHelperFuncsForUsers.deleteMySelf(endUserApiWrapper);

      const resAfterDelete = await platformUserApiWrapper.GET_ALL_CLIENT_USERS();
      const userCountAfterDelete = resAfterDelete.data.users_count;

      expect(userCountBeforeDelete - userCountAfterDelete).to.equal(1);
    } catch (error) {
      console.log('error: ', error.response.data.error.en);
    }
  });

  // add document
});
