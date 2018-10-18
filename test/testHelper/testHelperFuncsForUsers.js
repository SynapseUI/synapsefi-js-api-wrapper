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

  const documents = [
    {
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
      address_street: '101 2nd St',
      address_city: 'SF',
      address_subdivision: 'CA',
      address_postal_code: '94105',
      address_country_code: 'US',
      social_docs: [
        {
          document_value: 'https://www.facebook.com/valid',
          document_type: 'FACEBOOK',
        },
      ],
    },
  ];

  const { data } = await endUserApiWrapper.PATCH_ADD_NEW_DOCUMENTS({ documents });
  return { data };
};

module.exports.createCip1PersonalUser = async () => {
  const { data } = await platformUserApiWrapper.POST_CREATE_USER({
    bodyParams: {
      logins: [{ email: 'email.com' }],
      phone_numbers: ['123.123.1233'],
      legal_names: ['Cip Oneperson'],
      extra: {
        cip_tag: 1,
        is_business: false,
      },
      documents: [
        {
          email: 'personal@email.com',
          phone_number: '901.111.1111',
          ip: '::1',
          name: 'Cip Oneperson',
          alias: 'Test',
          entity_type: 'M',
          entity_scope: 'Arts & Entertainment',
          day: 2,
          month: 5,
          year: 1989,
          address_street: '101 2nd St',
          address_city: 'SF',
          address_subdivision: 'CA',
          address_postal_code: '94105',
          address_country_code: 'US',
        },
      ],
    },
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
  return { endUserApiWrapper };
};
