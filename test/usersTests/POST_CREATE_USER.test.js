const { expect } = require('chai');

const platformUserApiCannon = require('../testHelper/platformUserApiCannon');
const ApiFactory = require('../../src/ApiFactoryRelated/ApiFactory');

const reqBody = {
  logins: [{ email: 'email.com' }],
  phone_numbers: ['123.123.1233'],
  legal_names: ['Post User'],
};

// -[x] POST_CREATE_USER
//   - create user legal_name with "Post User"
//   - `expect get user to have response with legal name "Post User"`
//   - delete user
it('POST_CREATE_USER', async () => {
  // -----------------------------------------------------------------------------------
  const {
    data: { _id, refresh_token, legal_names },
  } = await platformUserApiCannon.POST_CREATE_USER({
    reqBody,
  });
  // -----------------------------------------------------------------------------------

  expect(legal_names[0]).to.equal('Post User');

  const endUserApiCannon = new ApiFactory({
    host: platformUserApiCannon.host,
    client_id: platformUserApiCannon.client_id,
    client_secret: platformUserApiCannon.client_secret,
    fingerprint: platformUserApiCannon.fingerprint,
    ip_address: platformUserApiCannon.ip_address,
    refresh_token,
    user_id: _id,
    oauth_key: '',
  });

  const { data: { oauth_key } } = await endUserApiCannon.POST_OAUTH_USER();
  endUserApiCannon.oauth_key = oauth_key;

  await endUserApiCannon.PATCH_USER_PERMISSION({ permissionStr: 'MAKE-IT-GO-AWAY' });
});
