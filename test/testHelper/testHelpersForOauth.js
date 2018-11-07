const ApiWrapper = require('../../src/ApiWrapperRelated/ApiWrapper');
const platformUserApiWrapper = require('./platformUserApiWrapper');

const createEndUserWithNoBaseDoc = async () => {
  const { data: dataFromCreateUser } = await platformUserApiWrapper
    .POST_CREATE_USER({
      logins: [{ email: 'email.com' }],
      phone_numbers: ['123.123.1233'],
      legal_names: ['Cip Oneperson'],
    })
    .catch(error => {
      console.log('error: ', error.response.data.error.en);
    });

  const { _id: user_id, refresh_token } = dataFromCreateUser;

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

  const { data: dataFromOauth } = await endUserApiWrapper
    .POST_OAUTH_USER({ refresh_token })
    .catch(error => {
      console.log('error: ', error.response.data.error.en);
    });

  const { oauth_key } = dataFromOauth;
  endUserApiWrapper.oauth_key = oauth_key;

  return { endUserApiWrapper };
};

module.exports = {
  createEndUserWithNoBaseDoc,
};
