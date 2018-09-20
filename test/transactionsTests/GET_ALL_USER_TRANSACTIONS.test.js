const { expect } = require('chai');

const platformUserApiWrapper = require('../testHelper/platformUserApiWrapper');
const testHelpersForNodes = require('../testHelper/testHelpersForNodes');
const testHelperFuncsForUsers = require('../testHelper/testHelperFuncsForUsers');

describe('GET_ALL_USER_TRANSACTIONS', () => {
  it('base', async () => {
    try {
      const { data: { trans_count } } = await platformUserApiWrapper.GET_ALL_USER_TRANSACTIONS();
      expect(trans_count).to.be.a('number');
    } catch (error) {
      console.log('error: ', error.response.data.error.en);
    }
  });

  it('page, per_page', async () => {
    try {
      const { data: { limit, page } } = await platformUserApiWrapper.GET_ALL_USER_TRANSACTIONS({
        page: 2,
        per_page: 1,
      });

      expect(page).to.equal(2);
      expect(limit).to.equal(1);
    } catch (error) {
      console.log('error: ', error.response.data.error.en);
    }
  });
});
