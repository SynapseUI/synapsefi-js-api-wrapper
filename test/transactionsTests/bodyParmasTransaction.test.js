const { expect } = require('chai');

const platformUserApiWrapper = require('../testHelper/platformUserApiWrapper');
const testHelperFuncs = require('../testHelper/testHelperFuncs');

describe('Create or Update Transaction with bodyParams', () => {
  it.only('create transaction with body params', async () => {
    const { endUserApiWrapper: userWapper1 } = await testHelperFuncs.createEndUserWithoutBaseDoc();
    const { endUserApiWrapper: userWapper2 } = await testHelperFuncs.createEndUserWithoutBaseDoc();

    const { node_id: node_id_1 } = await testHelperFuncs.createDepositNode({
      endUserApiWrapper: userWapper1,
    });
    const { node_id: node_id_2 } = await testHelperFuncs.createDepositNode({
      endUserApiWrapper: userWapper2,
    });

    const { data: dataFromCreateTransaction } = await userWapper1
      .POST_CREATE_TRANSACTION({
        from_node_id: node_id_1,
        bodyParams: {
          to: {
            type: 'DEPOSIT-US',
            id: node_id_2,
          },
          amount: {
            amount: 20.1,
            currency: 'USD',
          },
          extra: {
            ip: '192.168.0.1',
          },
          fees: [
            {
              fee: 0.2,
              note: 'Facilitator Fee',
              to: {
                id: node_id_2,
              },
            },
          ],
        },
      })
      .catch(error => {
        console.log('error: ', error.response.data.error.en);
      });

    expect(dataFromCreateTransaction.fees[0].fee).to.equal(0.2);

    await testHelperFuncs.removeEndUser({ endUserApiWrapper: userWapper1 });
    await testHelperFuncs.removeEndUser({ endUserApiWrapper: userWapper2 });
  });
});
