const { expect } = require('chai');

const platformUserApiCannon = require('../testHelper/platformUserApiCannon');
const testHelperFuncs = require('../testHelper/testHelperFuncs');

describe('PATCH_USER_PERMISSION', () => {
  // - Lock user
  //   - create user
  //   - lock user
  //   - `expect response from get user to have permission: LOCKED`
  //   - delete user
  it('lock user', async () => {
    const { endUserApiCannon } = await testHelperFuncs.createUser();

    // ---------------------------------------------------------------------------------------------
    const { data: { permission } } = await endUserApiCannon.PATCH_USER_PERMISSION({
      permissionStr: 'LOCKED',
    });
    // ---------------------------------------------------------------------------------------------
    expect(permission).to.equal('LOCKED');

    await testHelperFuncs.deleteMySelf(endUserApiCannon);
  });

  // - Delete user
  //   - create user
  //   - delete user
  //   - `expect response from get user to have permission: MAKE-IT-GO-AWAY`
  //   - delete user
  it('delete user', async () => {
    const { endUserApiCannon } = await testHelperFuncs.createUser();

    // ------------------------------------------------------------------------
    const { data: { permission } } = await endUserApiCannon.PATCH_USER_PERMISSION({
      permissionStr: 'MAKE-IT-GO-AWAY',
    });
    // ------------------------------------------------------------------------
    expect(permission).to.equal('MAKE-IT-GO-AWAY');

    await testHelperFuncs.deleteMySelf(endUserApiCannon);
  });
});