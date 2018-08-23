const { expect } = require('chai');

const ClassForApiReqs = require('../sampleApiReqs/ClassForApiReqs');
const platformApiReqs = require('./platformApiReqs');

const endUserApiReqs = new ClassForApiReqs({
  host: platformApiReqs.host,
  client_id: platformApiReqs.client_id,
  client_secret: platformApiReqs.client_secret,
  oauth_key: 'dummyOauthKey',
  fingerprint: platformApiReqs.fingerprint, // happen to be a same finger print as platform
  user_id: 'dummyUserId',
  refresh_token: 'dummyRefreshToken',
});

const getUserCount = async () => {
  const { data: { users_count } } = await platformApiReqs.GET_USERS();
  return users_count;
};

it("gets clients's users data", async () => {
  const { data: { users_count } } = await platformApiReqs.GET_USERS();
  console.log('users_count: ', users_count);

  expect(typeof users_count).to.equal('number');
});

it('gets selected user data', async () => {
  const { data: { refresh_token } } = await platformApiReqs.GET_USER();

  expect(typeof refresh_token).to.equal('string');
});

describe('create user -> update user -> get user oauth_key -> wait -> delete user', () => {
  beforeEach(async () => {
    const reqBody = {
      logins: [
        {
          email: 'test@synapsepay.com',
        },
      ],
      phone_numbers: ['314.315.3242'],
      legal_names: ['SEAN TEST'],
    };

    const { data: { refresh_token, _id } } = await platformApiReqs.POST_CREATE_USER(reqBody);
    console.log('_id: ', _id);
    console.log('refresh_token: ', refresh_token);

    endUserApiReqs.user_id = _id;
    endUserApiReqs.refresh_token = refresh_token;

    const { data: { oauth_key } } = await endUserApiReqs.POST_OAUTH_USER();
    console.log('oauth_key: ', oauth_key);

    endUserApiReqs.oauth_key = oauth_key;
  });

  it.only('dummy test', async () => {
    const beforeCount = await getUserCount();
    console.log('beforeCount: ', beforeCount);

    await endUserApiReqs.PATCH_HIDE_USER();

    const afterCount = await getUserCount();
    console.log('afterCount: ', afterCount);
  });
});
