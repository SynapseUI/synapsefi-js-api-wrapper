const { expect } = require('chai');

const platformUserApiCannon = require('../testHelper/platformUserApiCannon');

// - [x] GET_USERS
describe('GET_USERS', () => {
  //   - base -> has key users_count
  it.only('GET_USERS with no args', async () => {
    // -----------------------------------------------
    const { data } = await platformUserApiCannon.GET_USERS();
    // -----------------------------------------------

    expect(typeof data.users_count).to.equal('number');
  });

  //   - search name
  //     - create user name with "Search Name"
  //     - create user name with "Dont Search"
  //     - search ny name
  //     - `expect found users to have name "Search Name"`
  //     - delete both users
  
  // it.only('search name', async () => {
  //   // -----------------------------------------------
  //   const { data } = await platformUserApiCannon.GET_USERS({ query: });
  //   // -----------------------------------------------

  //   expect(typeof data.users_count).to.equal('number');
  // });

  //   - page, per_page
  //     - invoke with page: 2, per_page 2
  //     - `expext page = page, limit = 2`

  //   - query, per_page, page
  //     - create user email with "real@gmail.com"
  //     - create user email with "fake@gmail.com"
  //     - query will be email "real@gmail.com"
  //     - `expext page = 1, limit = 2, user with email: "real@gmail.com"`
  //     - delete both users
});
