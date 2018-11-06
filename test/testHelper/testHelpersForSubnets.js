const ApiWrapper = require('../../src/ApiWrapperRelated/ApiWrapper');
const platformUserApiWrapper = require('./platformUserApiWrapper');

const createEndUserWithBaseDoc = async () => {
  const { data: dataFromCreateUser } = await platformUserApiWrapper.POST_CREATE_USER({
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
  console.log('Create End User with Base Doc');

  const { _id: user_id, refresh_token } = dataFromCreateUser;
  console.log('user_id: ', user_id);

  const { host, client_id, client_secret, fingerprint, ip_address } = platformUserApiWrapper;

  const endUserApiWrapper = new ApiWrapper({
    host,
    client_id,
    client_secret,
    fingerprint,
    ip_address,
    refresh_token,
    user_id,
    oauth_key: '',
  });

  const { data: dataFromOauth } = await endUserApiWrapper.POST_OAUTH_USER({ refresh_token });
  console.log('Got Oauth key for end user');
  const { oauth_key } = dataFromOauth;
  endUserApiWrapper.oauth_key = oauth_key;

  return { endUserApiWrapper };
};

const createDepositNode = async ({ endUserApiWrapper }) => {
  const { data: dataFromCreateNode } = await endUserApiWrapper.POST_CREATE_NODE({
    bodyParams: { type: 'DEPOSIT-US', info: { nickname: 'My Checking' } },
  });
  console.log('Create Deposit Node');

  const { _id: node_id } = dataFromCreateNode.nodes[0];
  return { node_id };
};

const removeEndUser = async ({ endUserApiWrapper }) => {
  await endUserApiWrapper.PATCH_USER_PERMISSION({ permission: 'MAKE-IT-GO-AWAY' });
  console.log('delete end user');
};

module.exports = {
  createEndUserWithBaseDoc,
  createDepositNode,
  removeEndUser,
};
