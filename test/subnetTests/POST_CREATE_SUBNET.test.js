const { expect } = require('chai');

const testHelpersForSubnets = require('../testHelper/testHelpersForSubnets');

describe('Create AC/RT subnet', () => {
  it.only('returns account_num and routing_num as key', async () => {
    const { endUserApiWrapper } = await testHelpersForSubnets.createEndUserWithBaseDoc();

    const { node_id } = await testHelpersForSubnets.createDepositNode({ endUserApiWrapper });

    const { data: dataFromCreateSubnet } = await endUserApiWrapper
      .POST_CREATE_SUBNET({ nickname: 'AC/RT', node_id })
      .catch(error => {
        console.log('error: ', error.response.data.error.en);
      });

    const { account_class, account_num, routing_num } = dataFromCreateSubnet;

    expect(account_num !== undefined).to.equal(true);
    expect(routing_num !== undefined).to.equal(true);
    expect(account_class).to.equal('CHECKING');

    await testHelpersForSubnets.removeEndUser({ endUserApiWrapper });
  });
});
