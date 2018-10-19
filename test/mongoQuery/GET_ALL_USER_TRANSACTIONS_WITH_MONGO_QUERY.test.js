const { expect } = require('chai');

const platformUserApiWrapper = require('../testHelper/platformUserApiWrapper');
const create2Nodes2TransForPlatform = require('../testHelper/create2Nodes2TransForPlatform');

describe('Get all user transactions with mongo query', () => {
  it.only('base trans count that Platform user have greater than 2 -> 1', async () => {
    const { trans_id_1 } = await create2Nodes2TransForPlatform();

    const { data: respWithoutFilter } = await platformUserApiWrapper.GET_ALL_USER_TRANSACTIONS();
    const baseTransCount = respWithoutFilter.trans_count;

    const { data: respWithNodeIdFilter } = await platformUserApiWrapper.GET_ALL_USER_TRANSACTIONS({
      mongoQuery: { _id: trans_id_1 },
    });
    const transCountAfterFilter = respWithNodeIdFilter.trans_count;

    expect(baseTransCount).to.be.greaterThan(2);
    expect(transCountAfterFilter).to.equal(1);
  });
});
