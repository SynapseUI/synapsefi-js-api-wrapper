const { expect } = require('chai');

const apiReqsWithLessArgs = require('./apiReqsWithLessArgs');

it("gets clients's users data", async () => {
  const { data: { users_count } } = await apiReqsWithLessArgs.GET_USERS();
  console.log('users_count: ', users_count);

  expect(typeof users_count).to.equal('number');
});

it('gets selected user data', async () => {
  const { data: { refresh_token } } = await apiReqsWithLessArgs.GET_USER();

  expect(typeof refresh_token).to.equal('string');
});

describe('create user -> update user -> get user oauth_key -> wait -> delete user', () => {
  let userOAuth;

  beforeEach(async () => {
    const reqBody = {
      logins: [
        {
          email: 'test@synapsepay.com',
        },
      ],
      phone_numbers: ['901.111.1111', 'test@synapsepay.com'],
      legal_names: ['Test User'],
    };

    const { data: { refresh_token, _id } } = await apiReqsWithLessArgs.POST_CREATE_USER(reqBody);
    console.log('_id: ', _id);
    console.log('refresh_token: ', refresh_token);

    const { data: { oauth_key } } = await apiReqsWithLessArgs.POST_OAUTH_USER({
      user_id: _id,
      refresh_token,
    });

    userOAuth = oauth_key;
    console.log('userOAuth: ', userOAuth);
  });

  it.only('dummy test', () => {
    expect(1 + 1).to.equal(2);
  });
});
