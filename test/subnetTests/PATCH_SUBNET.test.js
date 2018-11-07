const { expect } = require('chai');

const testHelpersForSubnets = require('../testHelper/testHelpersForSubnets');

describe('patch subnet', () => {
  it('update subnet status props', async () => {
    const { endUserApiWrapper } = await testHelpersForSubnets.createEndUserWithBaseDoc();
    const { node_id } = await testHelpersForSubnets.createDepositNode({ endUserApiWrapper });
    const { subnet_id } = await testHelpersForSubnets.createSubnet({ endUserApiWrapper, node_id });

    // ['INACTIVE', 'ACTIVE', 'TERMINATED']

    const { data: dataFromPatchSubnet } = await endUserApiWrapper
      .PATCH_SUBNET({
        node_id,
        subnet_id,
        status: 'TERMINATED',
      })
      .catch(error => {
        // console.log('error: ', error);
        console.log('error: ', error.response.data.error.en);
      });

    await testHelpersForSubnets.removeEndUser({ endUserApiWrapper });
  });
});
