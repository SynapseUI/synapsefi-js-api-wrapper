const { expect } = require('chai');

const platformUserApiWrapper = require('../testHelper/platformUserApiWrapper');
const testHelpersForNodes = require('../testHelper/testHelpersForNodes');

describe('GET_ALL_USER_NODES', () => {
  let node_id_1;
  let node_id_2;

  beforeEach(async () => {
    const resp1 = await testHelpersForNodes.createDepositNode({
      nickname: 'NODE 1',
    });
    node_id_1 = resp1.node_id;

    const resp2 = await testHelpersForNodes.createDepositNode({
      nickname: 'NODE 2',
    });
    node_id_2 = resp2.node_id;
  });

  afterEach(async () => {
    await platformUserApiWrapper.DELETE_NODE({ node_id: node_id_1 });
    await platformUserApiWrapper.DELETE_NODE({ node_id: node_id_2 });

    await testHelpersForNodes.deleteAllNodeFromPlatformUser();
  });

  // - get all nodes base
  //   - > get all nodes
  //   - `expect node_count to be a number`
  it('basic get all nodes', async () => {
    // ---------------------------------------------------------------------------------------
    const { data: { node_count } } = await platformUserApiWrapper.GET_ALL_USER_NODES();
    // ---------------------------------------------------------------------------------------
    expect(node_count).to.be.a('number');
  });

  // - with page, per_page
  // - > get all nodes with page: 2, per_page: 1
  //   - `expect page = 2`
  //   - `expect limit = 1`
  it('with page and per_page', async () => {
    // ---------------------------------------------------------------------------------------
    const { data: { page, limit } } = await platformUserApiWrapper.GET_ALL_USER_NODES({
      page: 2,
      per_page: 1,
    });

    // ---------------------------------------------------------------------------------------
    expect(page).to.equal(2);
    expect(limit).to.equal(1);
  });

  // - with page, per_page, type
  //   - create 'CHECK-US' node
  //   - > serach for type: 'CHECK-US'
  //   - `expect node type = 'CHECK-US'`
  it('with page, per_page, and type', async () => {
    const {
      data: { nodes: { 0: { _id: check_node_id } } },
    } = await platformUserApiWrapper.POST_CREATE_NODE({
      bodyParams: {
        type: 'CHECK-US',
        info: {
          nickname: 'My Checking',
          payee_name: 'Some Name',
          payee_address: {
            address_street: '1 Market St',
            address_city: 'San Francisco',
            address_subdivision: 'CA',
            address_country_code: 'US',
            address_postal_code: '94105',
          },
        },
      },
    });
    // ---------------------------------------------------------------------------------------
    const { data: { nodes: { 0: { type } } } } = await platformUserApiWrapper.GET_ALL_USER_NODES({
      page: 1,
      per_page: 10,
      type: 'CHECK-US',
    });
    // ---------------------------------------------------------------------------------------

    expect(type).to.equal('CHECK-US');

    await platformUserApiWrapper.DELETE_NODE({ node_id: check_node_id });
  });
});
