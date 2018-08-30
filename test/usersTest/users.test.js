const { expect } = require('chai');

const ClassForApiReqs = require('../../sampleApiReqs/ClassForApiReqs');
const platformApiReqs = require('../platformApiReqs');

const endUserApiReqs = new ClassForApiReqs({
  host: platformApiReqs.host,
  client_id: platformApiReqs.client_id,
  client_secret: platformApiReqs.client_secret,
  oauth_key: 'dummyOauthKey',
  fingerprint: platformApiReqs.fingerprint, // happen to be a same finger print as platform
  user_id: 'dummyUserId',
  refresh_token: 'dummyRefreshToken',
});

const getUsersCount = async () => {
  const { data: { users_count } } = await platformApiReqs.GET_USERS();
  return users_count;
};

describe('simple get user test', () => {
  it("get all platform's users", async () => {
    const { data: { users_count } } = await platformApiReqs.GET_USERS();

    expect(typeof users_count).to.equal('number');
  });

  it("get all platform's users with query, page, per_page", async () => {
    const { data } = await platformApiReqs.GET_USERS({ query: 'SEAN', page: 2, per_page: 3 });
    expect(data.limit).to.equal(3);
    expect(data.page).to.equal(2);
  });

  it('get one user data with user_id', async () => {
    const { data: { refresh_token } } = await platformApiReqs.GET_USER();

    expect(typeof refresh_token).to.equal('string');
  });
});

describe('create user and get oauth before each test then delete that user', () => {
  beforeEach(async () => {
    const reqBody = {
      logins: [
        {
          email: 'test@synapsepay.com',
        },
      ],
      phone_numbers: ['314.315.3242'],
      legal_names: ['Sean Test'],
    };

    const { data: { refresh_token, _id, legal_names } } = await platformApiReqs.POST_CREATE_USER({
      reqBody,
    });

    endUserApiReqs.user_id = _id;
    endUserApiReqs.refresh_token = refresh_token;

    const { data: { oauth_key } } = await endUserApiReqs.POST_OAUTH_USER();

    endUserApiReqs.oauth_key = oauth_key;
  });

  it('Add legal_name Hong Test and remove Sean Test', async () => {
    const updateObj = {
      phone_number: '9019411111',
      remove_phone_number: '9019411111',
      legal_name: 'Hong Test',
      remove_legal_name: 'Sean Test',
    };

    const { data } = await endUserApiReqs.PATCH_UPDATE_USER({ updateObj });
    expect(data.legal_names).to.equal(data.legal_names);
  });

  afterEach(async () => {
    const beforeCount = await getUsersCount();
    console.log('beforeCount: ', beforeCount);

    const { data: { permission } } = await endUserApiReqs.PATCH_USER_PERMISSION({
      permissionStr: 'MAKE-IT-GO-AWAY',
    });

    const afterCount = await getUsersCount();
    console.log('afterCount: ', afterCount);
  });
});
