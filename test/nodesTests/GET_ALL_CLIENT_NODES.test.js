const { expect } = require('chai');

const platformUserApiWrapper = require('../testHelper/platformUserApiWrapper');
const testHelpersForNodes = require('../testHelper/testHelpersForNodes');

const randomatic = require('randomatic');

describe('GET_ALL_CLIENT_NODES', () => {
  it('base', async () => {
    // ---------------------------------------------------------------------------------------
    const { data: { node_count } } = await platformUserApiWrapper.GET_ALL_CLIENT_NODES();
    // ---------------------------------------------------------------------------------------
    expect(node_count).to.be.a('number');
  });

  it('page and limit', async () => {
    // ---------------------------------------------------------------------------------------
    const { data: { page, limit } } = await platformUserApiWrapper.GET_ALL_CLIENT_NODES({
      page: 2,
      per_page: 1,
    });
    // ---------------------------------------------------------------------------------------
    expect(page).to.equal(2);
    expect(limit).to.equal(1);
  });

  xit('does not support type: yet', async () => {
    const {
      data: { nodes: { 0: { _id: node_id, allowed } } },
    } = await platformUserApiWrapper.POST_ACH_WITH_AC_RN({
      bodyParams: {
        info: {
          nickname: 'Fake Account',
          account_num: randomatic('0', 13),
          routing_num: '051000017',
          type: 'PERSONAL',
          class: 'CHECKING',
        },
      },
    });

    // ---------------------------------------------------------------------------------------
    const { data } = await platformUserApiWrapper.GET_ALL_CLIENT_NODES({
      type: 'ACH-US',
    });

    expect(data.node_count).to.equal(1);
    // ---------------------------------------------------------------------------------------
  });
});
