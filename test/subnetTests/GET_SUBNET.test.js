const { expect } = require('chai');

const testHelpersForSubnets = require('../testHelper/testHelpersForSubnets');

describe('get one subnet', () => {
  it('returns acc and rout num', async () => {
    const { endUserApiWrapper } = await testHelpersForSubnets.createEndUserWithBaseDoc();
    const { node_id } = await testHelpersForSubnets.createDepositNode({ endUserApiWrapper });
    const { subnet_id } = await testHelpersForSubnets.createSubnet({ endUserApiWrapper, node_id });

    const { data: dataFromGetSubnet } = await endUserApiWrapper.GET_SUBNET({ node_id, subnet_id });

    const { account_class, account_num, routing_num } = dataFromGetSubnet;

    expect(account_num !== undefined).to.equal(true);
    expect(routing_num !== undefined).to.equal(true);
    expect(account_class).to.equal('CHECKING');

    await testHelpersForSubnets.removeEndUser({ endUserApiWrapper });
  });
});
