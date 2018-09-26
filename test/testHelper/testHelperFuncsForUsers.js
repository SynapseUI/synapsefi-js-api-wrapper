const platformUserApiWrapper = require('./platformUserApiWrapper');
const ApiWrapper = require('../../src/ApiWrapperRelated/ApiWrapper');

//
const getOauth = async ({ endUserApiWrapper }) => {
  const { data: { oauth_key } } = await endUserApiWrapper.POST_OAUTH_USER();
  return { oauth_key };
};

module.exports.getOauth = getOauth;

//
module.exports.createUser = async (obj = {}) => {
  const email = obj.email === undefined ? 'test@synapsepay.com' : obj.email;
  const phone_numbers = obj.phone_numbers === undefined ? ['314.315.3242'] : obj.phone_numbers;
  const legal_names = obj.legal_names === undefined ? ['Default Name'] : obj.legal_names;

  const { data } = await platformUserApiWrapper.POST_CREATE_USER({
    logins: [{ email }],
    phone_numbers,
    legal_names,
  });

  const endUserApiWrapper = new ApiWrapper({
    host: platformUserApiWrapper.host,
    client_id: platformUserApiWrapper.client_id,
    client_secret: platformUserApiWrapper.client_secret,
    fingerprint: platformUserApiWrapper.fingerprint,
    ip_address: platformUserApiWrapper.ip_address,
    refresh_token: data.refresh_token,
    user_id: data._id,
    oauth_key: '',
  });

  const { oauth_key } = await getOauth({
    endUserApiWrapper,
    user_id: data._id,
    refresh_token: data.refresh_token,
  });

  endUserApiWrapper.oauth_key = oauth_key;
  return { endUserApiWrapper, user_id: data._id, refresh_token: data.refresh_token };
};

module.exports.deleteMySelf = async endUserApiWrapper => {
  const resp = await endUserApiWrapper.PATCH_USER_PERMISSION({
    permission: 'MAKE-IT-GO-AWAY',
  });

  return resp;
};

module.exports.addDocument = async (
  obj = {
    email: 'test@test.com',
    name: 'Test User',
    userType: 'BUSINESS',
    endUserApiWrapper: undefined,
  }
) => {
  const { email, name, userType, endUserApiWrapper } = obj;

  const documentObj = {
    email: email === undefined ? 'test@test.com' : email,
    phone_number: '901.111.1111',
    ip: '::1',
    name: name === undefined ? 'Test User' : name,
    alias: 'Test',
    entity_type: userType === 'BUSINESS' ? 'LLC' : 'M',
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

  const { data } = await endUserApiWrapper.PATCH_ADD_DOCUMENT({ documentObj });
  return { data };
};
