const { expect } = require('chai');

const platformUserApiCannon = require('../testHelper/platformUserApiCannon');
const testHelperFuncs = require('../testHelper/testHelperFuncs');

describe('PATCH_UPDATE_USER', () => {
  // - update legal name, login email, password, and phone number
  //   - create user with legal_names ["Before User"], email: before@email.com, phone_number: 1231231233
  //   - add legal name "After User",
  //   - add login email -> update@email.com, password: test1234
  //   - add phone_number -> 9879879877
  //   - remove legal_name "Before User"
  //   - remove phone_number "1231231233"
  //   - remove email before@email.com
  //   - `expect legal_name to be User Two`
  //   - `expect login email: update@email.com`
  //   - `expect phone number to be 9879879877`
  //   - delete user
  it.only('update legal name, login email, password, and phone number', async () => {
    const { endUserApiCannon } = await testHelperFuncs.createUser({
      legal_names: ['Before User'],
      phone_numbers: ['1231231233'],
      email: 'before@email.com',
    });

    // -----------------------------------------------------------------
    await endUserApiCannon.PATCH_UPDATE_USER({
      updateObj: {
        legal_name: 'After User',
        login: { email: 'after@email.com' },
        phone_number: '9879879877',
        remove_legal_name: 'Before User',
        remove_login: { email: 'before@email.com' },
        remove_phone_number: '1231231233',
      },
    });
    // -----------------------------------------------------------------

    const { data: { legal_names, logins, phone_numbers } } = await endUserApiCannon.GET_USER();

    expect(legal_names[0]).to.equal('After User');
    expect(phone_numbers[0]).to.equal('9879879877');
    expect(logins[0].email).to.equal('after@email.com');

    await testHelperFuncs.deleteMySelf(endUserApiCannon);
  });
});
