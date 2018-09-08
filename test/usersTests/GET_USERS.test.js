const { expect } = require('chai');

const platformUserApiCannon = require('../testHelper/platformUserApiCannon');

const testHelperFuncs = require('../testHelper/testHelperFuncs');

// - [x] GET_USERS
describe('GET_USERS', () => {
  //   - base -> has key users_count
  it('GET_USERS with no args', async () => {
    // -------------------------------------------------------
    const { data } = await platformUserApiCannon.GET_USERS();
    // -------------------------------------------------------

    expect(typeof data.users_count).to.equal('number');
  });

  //   - search name
  //     - create user name with "Search Yes"
  //     - create user name with "Search No"
  //     - search ny name
  //     - `expect found users to have name "Search Name"`
  //     - delete both users
  it('search name', async () => {
    try {
      const { endUserApiCannon: endUserApiCannon1 } = await testHelperFuncs.createUser({
        legal_names: ['Search Yes'],
      });
      const { endUserApiCannon: endUserApiCannon2 } = await testHelperFuncs.createUser({
        legal_names: ['Search No'],
      });
      // ------------------------------------------------------------------------------
      const { data } = await platformUserApiCannon.GET_USERS({ query: 'Search Yes' });
      // ------------------------------------------------------------------------------

      expect(data.users[0].legal_names).to.include.members(['Search Yes']);

      await testHelperFuncs.deleteMySelf(endUserApiCannon1);
      await testHelperFuncs.deleteMySelf(endUserApiCannon2);
    } catch (error) {
      console.log('error: ', error.response.data.error.en);
    }
  });

  //   - page, per_page
  //     - invoke with page: 2, per_page: 3
  //     - `expext page = 2, limit = 3`
  //     - `expext limit = 3`
  it('page, per_page', async () => {
    // ------------------------------------------------------------------------------
    const { data: { page, limit } } = await platformUserApiCannon.GET_USERS({
      page: 2,
      per_page: 3,
    });
    // ------------------------------------------------------------------------------

    expect(page).to.equal(2);
    expect(limit).to.equal(3);
  });

  //   - query, per_page, page
  //     - create user email with "real@gmail.com"
  //     - create user email with "fake@gmail.com"
  //     - query will be email "real@gmail.com"
  //     - `expext page = 1, limit = 2, user with email: "real@gmail.com"`
  //     - delete both users
  it('query, per_page, page', async () => {
    const { endUserApiCannon: endUserApiCannon1 } = await testHelperFuncs.createUser({
      email: 'real@gmail.com',
    });
    const { endUserApiCannon: endUserApiCannon2 } = await testHelperFuncs.createUser({
      email: 'fake@gmail.com',
    });

    // ------------------------------------------------------------------------------
    const { data } = await platformUserApiCannon.GET_USERS({
      query: 'real@gmail.com',
      page: 1,
      per_page: 2,
    });
    // ------------------------------------------------------------------------------

    expect(data.page).to.equal(1);
    expect(data.limit).to.equal(2);
    expect(data.users[0].logins[0].email).to.equal('real@gmail.com');

    await testHelperFuncs.deleteMySelf(endUserApiCannon1);
    await testHelperFuncs.deleteMySelf(endUserApiCannon2);
  });
});
