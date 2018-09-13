const { expect } = require('chai');

const platformUserApiCannon = require('../testHelper/platformUserApiCannon');
const testHelperFuncs = require('../testHelper/testHelperFuncs');

describe('POST_CREATE_NODE', () => {
  // - POST_CREATE_NODE
  //   - > create "DEPOSIT-US" node
  //   - `expect node type = "DEPOSIT-US"`
  //   - delete node
  it.only('create deposit node', async () => {
    const {
      data: { nodes: { [0]: { info: { nickname }, type } } },
    } = await platformUserApiCannon.POST_CREATE_NODE({
      reqBody: {
        type: 'DEPOSIT-US',
        info: {
          nickname: 'My Checking',
        },
      },
    });

    expect(nickname).to.equal('My Checking');
    expect(type).to.equal('DEPOSIT-US');
  });
});
