const { expect } = require('chai');

const platformUserApiWrapper = require('../testHelper/platformUserApiWrapper');
const ApiFactory = require('../../src/ApiFactoryRelated/ApiFactory');

// -[x] POST_CREATE_USER
//   - create user legal_name with "Post User"
//   - `expect get user to have response with legal name "Post User"`
//   - delete user
describe('POST_CREATE_USER', () => {
  it('create user with base info', async () => {
    // -----------------------------------------------------------------------------------
    const {
      data: { _id, refresh_token, legal_names },
    } = await platformUserApiWrapper.POST_CREATE_USER({
      logins: [{ email: 'email.com' }],
      phone_numbers: ['123.123.1233'],
      legal_names: ['Post User'],
    });
    // -----------------------------------------------------------------------------------

    expect(legal_names[0]).to.equal('Post User');

    const endUserApiCannon = new ApiFactory({
      host: platformUserApiWrapper.host,
      client_id: platformUserApiWrapper.client_id,
      client_secret: platformUserApiWrapper.client_secret,
      fingerprint: platformUserApiWrapper.fingerprint,
      ip_address: platformUserApiWrapper.ip_address,
      refresh_token,
      user_id: _id,
      oauth_key: '',
    });

    const { data: { oauth_key } } = await endUserApiCannon.POST_OAUTH_USER();
    endUserApiCannon.oauth_key = oauth_key;

    await endUserApiCannon.PATCH_USER_PERMISSION({ permissionStr: 'MAKE-IT-GO-AWAY' });
  });

  it('optionalBodyParams', async () => {
    // -----------------------------------------------------------------------------------
    const {
      data: { _id, refresh_token, legal_names, extra },
    } = await platformUserApiWrapper.POST_CREATE_USER({
      logins: [{ email: 'email.com' }],
      phone_numbers: ['123.123.1233'],
      legal_names: ['Post User'],
      optionalBodyParams: {
        extra: {
          public_note: 'yeah i am a public note',
        },
      },
    });
    // -----------------------------------------------------------------------------------

    expect(extra.public_note).to.equal('yeah i am a public note');

    const endUserApiCannon = new ApiFactory({
      host: platformUserApiWrapper.host,
      client_id: platformUserApiWrapper.client_id,
      client_secret: platformUserApiWrapper.client_secret,
      fingerprint: platformUserApiWrapper.fingerprint,
      ip_address: platformUserApiWrapper.ip_address,
      refresh_token,
      user_id: _id,
      oauth_key: '',
    });

    const { data: { oauth_key } } = await endUserApiCannon.POST_OAUTH_USER();
    endUserApiCannon.oauth_key = oauth_key;

    await endUserApiCannon.PATCH_USER_PERMISSION({ permissionStr: 'MAKE-IT-GO-AWAY' });
  });
});
