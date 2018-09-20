const { expect } = require('chai');

const platformUserApiWrapper = require('../testHelper/platformUserApiWrapper');
const testHelperFuncsForUsers = require('../testHelper/testHelperFuncsForUsers');

describe('POST_CREATE_NODE', () => {
  // - POST_CREATE_NODE
  //   - > create "DEPOSIT-US" node
  //   - `expect node type = "DEPOSIT-US"`
  //   - delete node
  it('create deposit node', async () => {
    // -----------------------------------------------------------------------------------------------
    const {
      data: { nodes: { [0]: { _id: node_id, info: { nickname }, type } } },
    } = await platformUserApiWrapper.POST_CREATE_NODE({
      bodyParams: {
        type: 'DEPOSIT-US',
        info: {
          nickname: 'My Checking',
        },
      },
    });
    // -----------------------------------------------------------------------------------------------

    expect(nickname).to.equal('My Checking');
    expect(type).to.equal('DEPOSIT-US');

    platformUserApiWrapper.DELETE_NODE({ node_id });
  });
});
