const { expect } = require('chai');
const randomatic = require('randomatic');

const platformUserApiCannon = require('../testHelper/platformUserApiCannon');
const testHelpersForNodes = require('../testHelper/testHelpersForNodes');

describe('PATCH_VERIFY_MICRO_DEPOSIT', () => {
  // - create ach with account and routing number
  // -> verify micro deposit
  // - `expect initial allowed to equal "CREDIT"
  // - `expect allowed after verify to eqaul "CREADIT-AND-DEBIT"
  it('verify micro deposit', async () => {
    const {
      data: { nodes: { 0: { _id: node_id, allowed: initialAllowed } } },
    } = await platformUserApiCannon.POST_ACH_WITH_AC_RN({
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

    // ---------------------------------------------------------------------------------------------
    const { data: { allowed } } = await platformUserApiCannon.PATCH_VERIFY_MICRO_DEPOSIT({
      node_id,
      micro: [0.1, 0.1],
    });
    // ---------------------------------------------------------------------------------------------

    expect(initialAllowed).to.equal('CREDIT');
    expect(allowed).to.equal('CREDIT-AND-DEBIT');

    await platformUserApiCannon.DELETE_NODE({ node_id });
  });
});
