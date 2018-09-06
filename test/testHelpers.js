const platformApiReqs = require('./platformApiReqs');
const ClassForApiReqs = require('../sampleApiReqs/ClassForApiReqs');

//
const endUserApiReqs = new ClassForApiReqs({
  host: platformApiReqs.host,
  client_id: platformApiReqs.client_id,
  client_secret: platformApiReqs.client_secret,
  oauth_key: 'dummyOauthKey',
  fingerprint: platformApiReqs.fingerprint, // happen to be a same finger print as platform
  user_id: 'dummyUserId',
  refresh_token: 'dummyRefreshToken',
});

module.exports.endUserApiReqs = endUserApiReqs;

//
module.exports.getUserIdAndRefreshTokenByCreatingUser = async () => {
  const reqBody = {
    logins: [
      {
        email: 'test@synapsepay.com',
      },
    ],
    phone_numbers: ['314.315.3242'],
    legal_names: ['Sean Test'],
  };

  const { data } = await platformApiReqs.POST_CREATE_USER({ reqBody });
  return { user_id: data._id, refresh_token: data.refresh_token };
};

module.exports.getOauthFromRefreshToken = async (user_id, refresh_token) => {
  endUserApiReqs.user_id = user_id;
  endUserApiReqs.refresh_token = refresh_token;

  const { data: { oauth_key } } = await endUserApiReqs.POST_OAUTH_USER();
  return { oauth_key };
};

module.exports.createDocWithMinRequirements = async (user_id, refresh_token, oauth_key) => {
  endUserApiReqs.user_id = user_id;
  endUserApiReqs.refresh_token = refresh_token;
  endUserApiReqs.oauth_key = oauth_key;

  const documentObj = {
    email: 'test@test.com',
    phone_number: '901.111.1111',
    ip: '::1',
    name: 'Test User',
    alias: 'Test',
    entity_type: 'M',
    entity_scope: 'Arts & Entertainment',
    day: 2,
    month: 5,
    year: 1989,
    address_street: '1 Market St.',
    address_city: 'SF',
    address_subdivision: 'CA',
    address_postal_code: '94114',
    address_country_code: 'US',
    social_docs: [
      {
        document_value: 'https://www.facebook.com/valid',
        document_type: 'FACEBOOK',
      },
    ],
  };

  const { data } = await endUserApiReqs.PATCH_ADD_DOCUMENTS({ documentObj });
  return { data };
};
