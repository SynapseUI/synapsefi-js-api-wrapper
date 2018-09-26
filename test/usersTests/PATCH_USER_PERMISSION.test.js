const { expect } = require('chai');

const platformUserApiWrapper = require('../testHelper/platformUserApiWrapper');
const testHelperFuncsForUsers = require('../testHelper/testHelperFuncsForUsers');

describe('PATCH_USER_PERMISSION', () => {
  // - Lock user
  //   - create user
  //   - lock user
  //   - `expect response from get user to have permission: LOCKED`
  //   - delete user
  it.only('lock user', async () => {
    const { endUserApiWrapper } = await testHelperFuncsForUsers.createUser();

    // ---------------------------------------------------------------------------------------------
    const { data: { permission } } = await endUserApiWrapper.PATCH_USER_PERMISSION({
      permission: 'LOCKED',
    });
    // ---------------------------------------------------------------------------------------------
    expect(permission).to.equal('LOCKED');

    await testHelperFuncsForUsers.deleteMySelf(endUserApiWrapper);
  });

  // - Delete user
  //   - create user
  //   - delete user
  //   - `expect response from get user to have permission: MAKE-IT-GO-AWAY`
  //   - delete user
  it.only('delete user', async () => {
    const { endUserApiWrapper } = await testHelperFuncsForUsers.createUser();

    // ------------------------------------------------------------------------
    const { data: { permission } } = await endUserApiWrapper.PATCH_USER_PERMISSION({
      permission: 'MAKE-IT-GO-AWAY',
    });
    // ------------------------------------------------------------------------
    expect(permission).to.equal('MAKE-IT-GO-AWAY');

    await testHelperFuncsForUsers.deleteMySelf(endUserApiWrapper);
  });
});
