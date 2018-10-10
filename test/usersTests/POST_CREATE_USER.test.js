const { expect } = require('chai');

const platformUserApiWrapper = require('../testHelper/platformUserApiWrapper');
const ApiWrapper = require('../../src/ApiWrapperRelated/ApiWrapper');

// -[x] POST_CREATE_USER
//   - create user legal_name with "Post User"
//   - `expect get user to have response with legal name "Post User"`
//   - delete user
describe('POST_CREATE_USER', () => {
  it.only('create user with base info', async () => {
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

    const endUserApiWrapper = new ApiWrapper({
      host: platformUserApiWrapper.host,
      client_id: platformUserApiWrapper.client_id,
      client_secret: platformUserApiWrapper.client_secret,
      fingerprint: platformUserApiWrapper.fingerprint,
      ip_address: platformUserApiWrapper.ip_address,
      refresh_token,
      user_id: _id,
      oauth_key: '',
    });

    const { data: { oauth_key } } = await endUserApiWrapper.POST_OAUTH_USER();
    endUserApiWrapper.oauth_key = oauth_key;

    // await endUserApiWrapper.PATCH_USER_PERMISSION({ permission: 'MAKE-IT-GO-AWAY' });
  });

  it.only('with bodyParams', async () => {
    // -----------------------------------------------------------------------------------
    const {
      data: { _id, refresh_token, legal_names, extra },
    } = await platformUserApiWrapper.POST_CREATE_USER({
      bodyParams: {
        logins: [{ email: 'email.com' }],
        phone_numbers: ['123.123.1233'],
        legal_names: ['Post User'],
        extra: {
          public_note: 'yeah i am a public note',
        },
      },
    });
    // -----------------------------------------------------------------------------------

    expect(extra.public_note).to.equal('yeah i am a public note');

    const endUserApiWrapper = new ApiWrapper({
      host: platformUserApiWrapper.host,
      client_id: platformUserApiWrapper.client_id,
      client_secret: platformUserApiWrapper.client_secret,
      fingerprint: platformUserApiWrapper.fingerprint,
      ip_address: platformUserApiWrapper.ip_address,
      refresh_token,
      user_id: _id,
      oauth_key: '',
    });

    const { data: { oauth_key } } = await endUserApiWrapper.POST_OAUTH_USER();
    endUserApiWrapper.oauth_key = oauth_key;

    await endUserApiWrapper.PATCH_USER_PERMISSION({ permission: 'MAKE-IT-GO-AWAY' });
  });
});
