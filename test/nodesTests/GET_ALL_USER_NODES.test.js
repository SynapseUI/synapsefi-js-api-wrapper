const { expect } = require('chai');

const platformUserApiCannon = require('../testHelper/platformUserApiCannon');
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
    await platformUserApiCannon.DELETE_NODE({ node_id: node_id_1 });
    await platformUserApiCannon.DELETE_NODE({ node_id: node_id_2 });

    await testHelpersForNodes.deleteAllNodeFromPlatformUser();
  });

  // - GET_ALL_USER_NODES
  //   - create default node node 1
  //   - create default node node 2
  //   - > get all nodes
  //   - `expect node legnth = 2`
  //   - delete 2 nodes
  it('get all one user nodes', async () => {
    // await testHelpersForNodes.deleteAllNodeFromPlatformUser();

    // ---------------------------------------------------------------------------------------
    const { data: { nodes } } = await platformUserApiCannon.GET_ALL_USER_NODES();
    // ---------------------------------------------------------------------------------------
    expect(nodes.length).to.equal(2);
  });

  // page=2
  // per_page=1
  it('get all one user nodes', async () => {
    // ---------------------------------------------------------------------------------------
    const { data: { page, limit } } = await platformUserApiCannon.GET_ALL_USER_NODES({
      page: 2,
      per_page: 1,
    });

    expect(page).to.equal(2);
    expect(limit).to.equal(1);
    // ---------------------------------------------------------------------------------------
  });

  // query=CHECK-US
  // page=2
  // per_page=1
  // expect check-us
  it.only('get all one user nodes', async () => {
    const {
      data: { nodes: { 0: { _id: check_node_id } } },
    } = await platformUserApiCannon.POST_CREATE_NODE({
      reqBody: {
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
    const { data } = await platformUserApiCannon.GET_ALL_USER_NODES({
      page: 1,
      per_page: 10,
      type: 'CHECK-US',
    });
    console.log('data: ', data);
    // ---------------------------------------------------------------------------------------

    await platformUserApiCannon.DELETE_NODE({ node_id: check_node_id });
  });
});
