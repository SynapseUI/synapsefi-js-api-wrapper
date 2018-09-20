const { expect } = require('chai');

const platformUserApiCannon = require('../testHelper/platformUserApiCannon');
const testHelpersForNodes = require('../testHelper/testHelpersForNodes');
const testHelperFuncsForUsers = require('../testHelper/testHelperFuncsForUsers');

describe('GET_ALL_CLIENT_TRANSACTIONS', () => {
  // - create user 1 -> create node 1
  // - create user 2 -> create node 2
  // - create node for platform
  // - make transaction from platform node to user 1 node
  // - make transaction from user 1 node 1 to user 2 node 2
  it.only('base', async () => {
    const {
      data: { trans_count, page_count },
    } = await platformUserApiCannon.GET_ALL_CLIENT_TRANSACTIONS();
    expect(trans_count).to.be.a('number');
  });

  it.only('page and per_page', async () => {
    const {
      data: { limit, page, trans_count },
    } = await platformUserApiCannon.GET_ALL_CLIENT_TRANSACTIONS({
      page: 2,
      per_page: 1,
    });

    expect(page).to.equal(2);
    expect(limit).to.equal(1);
  });
});
