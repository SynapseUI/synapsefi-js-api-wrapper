const { expect } = require('chai');

const platformUserApiWrapper = require('../testHelper/platformUserApiWrapper');

describe('GET_ALL_CLIENT_USERS with mongoQuery', () => {
  it.only('by user_id', async () => {
    try {
      const { data: { users } } = await platformUserApiWrapper.GET_ALL_CLIENT_USERS();

      const {
        data: { users_count: users_count_with_filter },
      } = await platformUserApiWrapper.GET_ALL_CLIENT_USERS({
        mongoQuery: { _id: users[0]._id },
      });

      expect(users_count_with_filter).to.equal(1);
    } catch (error) {
      throw new Error(error);
    }
  });
});
