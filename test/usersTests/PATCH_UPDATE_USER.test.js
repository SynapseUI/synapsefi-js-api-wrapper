const { expect } = require('chai');

const platformUserApiWrapper = require('../testHelper/platformUserApiWrapper');
const testHelperFuncsForUsers = require('../testHelper/testHelperFuncsForUsers');

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
  it('update legal name, login email, password, and phone number, public_note', async () => {
    const { endUserApiCannon } = await testHelperFuncsForUsers.createUser({
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
        public_note: 'Eask just updated public note ~~~',
      },
    });
    // -----------------------------------------------------------------

    const {
      data: { legal_names, logins, phone_numbers, extra: { public_note } },
    } = await endUserApiCannon.GET_USER();

    expect(legal_names[0]).to.equal('After User');
    expect(phone_numbers[0]).to.equal('9879879877');
    expect(logins[0].email).to.equal('after@email.com');
    expect(public_note).to.equal('Eask just updated public note ~~~');

    await testHelperFuncsForUsers.deleteMySelf(endUserApiCannon);
  });

  // - update cip_tag
  //   - create uesr
  //   - update cip_tag to PLATFORM
  //   - update public_note to "updated public note"
  //   - `expect cip tag to be "PLATFORM"`
  //   - `expect public note to be "PLATFORM"`
  //   - delete user
  it('update cip_tag', async () => {
    const { endUserApiCannon } = await testHelperFuncsForUsers.createUser();

    const {
      data: {
        extra: { cip_tag: cip_tag_before, public_note: public_note_before },
        legal_names: legal_name_before,
      },
    } = await endUserApiCannon.GET_USER();
    // console.log('-------------------------');
    // console.log('legal_name_before: ', legal_name_before);
    // console.log('public_note_before: ', public_note_before);
    // console.log('cip_tag_before: ', cip_tag_before);
    // console.log('-------------------------');

    // -----------------------------------------------------------------
    await endUserApiCannon.PATCH_UPDATE_USER({
      updateObj: {
        legal_name: 'After User',
        cip_tag: 2,
        // public_note: 'Eask just updated public note ~~~',
      },
    });
    // -----------------------------------------------------------------

    const {
      data: {
        extra: { cip_tag: cip_tag_after, public_note: public_note_after },
        legal_names: legal_name_after,
      },
    } = await endUserApiCannon.GET_USER();
    // console.log('legal_name_after: ', legal_name_after);
    // console.log('public_note_after: ', public_note_after);
    // console.log('cip_tag_after: ', cip_tag_after);

    expect(cip_tag_after).to.equal(2);

    await testHelperFuncsForUsers.deleteMySelf(endUserApiCannon);
  });
});
