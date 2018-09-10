const platformUserApiCannon = require('./platformUserApiCannon');
const ApiFactory = require('../../src/ApiFactoryRelated/ApiFactory');

//
const getOauth = async ({ endUserApiCannon }) => {
  const { data: { oauth_key } } = await endUserApiCannon.POST_OAUTH_USER();
  return { oauth_key };
};

module.exports.getOauth = getOauth;

//
module.exports.createUser = async (obj = {}) => {
  const email = obj.email === undefined ? 'test@synapsepay.com' : obj.email;
  const phone_numbers = obj.phone_numbers === undefined ? ['314.315.3242'] : obj.phone_numbers;
  const legal_names = obj.legal_names === undefined ? ['Default Name'] : obj.legal_names;

  const reqBody = {
    logins: [{ email }],
    phone_numbers,
    legal_names,
  };

  const { data } = await platformUserApiCannon.POST_CREATE_USER({ reqBody });

  const endUserApiCannon = new ApiFactory({
    host: platformUserApiCannon.host,
    client_id: platformUserApiCannon.client_id,
    client_secret: platformUserApiCannon.client_secret,
    fingerprint: platformUserApiCannon.fingerprint,
    ip_address: platformUserApiCannon.ip_address,
    refresh_token: data.refresh_token,
    user_id: data._id,
    oauth_key: '',
  });

  const { oauth_key } = await getOauth({
    endUserApiCannon,
    user_id: data._id,
    refresh_token: data.refresh_token,
  });

  endUserApiCannon.oauth_key = oauth_key;
  return { endUserApiCannon, user_id: data._id, refresh_token: data.refresh_token };
};

module.exports.deleteMySelf = async endUserApiCannon => {
  const resp = await endUserApiCannon.PATCH_USER_PERMISSION({
    permissionStr: 'MAKE-IT-GO-AWAY',
  });

  return resp;
};

module.exports.addDocument = async (
  obj = {
    email: 'test@test.com',
    name: 'Test User',
    userType: 'BUSINESS',
  }
) => {
  const { email, name, userType } = obj;

  const documentObj = {
    email,
    phone_number: '901.111.1111',
    ip: '::1',
    name,
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

  const { data } = await endUser.PATCH_ADD_DOCUMENTS({ documentObj });
  return { data };
};
