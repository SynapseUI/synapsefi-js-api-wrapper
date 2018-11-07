const { expect } = require('chai');

const testHelpersForSubnets = require('../testHelper/testHelpersForSubnets');

describe('test subnet termination', () => {
  it('return less subnet than created amount', async () => {
    const { endUserApiWrapper } = await testHelpersForSubnets.createEndUserWithBaseDoc();
    const { node_id } = await testHelpersForSubnets.createDepositNode({ endUserApiWrapper });

    const { subnet_id: subnet_id_1 } = await testHelpersForSubnets.createSubnet({
      endUserApiWrapper,
      node_id,
    });
    await testHelpersForSubnets.createSubnet({ endUserApiWrapper, node_id });
    await testHelpersForSubnets.createSubnet({ endUserApiWrapper, node_id });

    await testHelpersForSubnets.terminateSubnet({
      endUserApiWrapper,
      node_id,
      subnet_id: subnet_id_1,
    });

    const { data: dataFromGetSubnets } = await endUserApiWrapper
      .GET_SUBNETS({ node_id })
      .catch(error => {
        console.log('error: ', error.response.data.error.en);
      });

    const { subnets_count } = dataFromGetSubnets;
    console.log('subnets_count: ', subnets_count);

    await testHelpersForSubnets.removeEndUser({ endUserApiWrapper });
  });
});
