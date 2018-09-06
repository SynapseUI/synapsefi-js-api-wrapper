const { expect } = require('chai');

const testHelpers = require('./testHelpers');

it('test get user id & refresh tocken after creating user', async () => {
  const { user_id, refresh_token } = await testHelpers.getUserIdAndRefreshTokenByCreatingUser();
  console.log('refresh_token: ', refresh_token);
  console.log('user_id: ', user_id);
});

it('get oauth key from refresh token', async () => {
  const { user_id, refresh_token } = await testHelpers.getUserIdAndRefreshTokenByCreatingUser();
  const { oauth_key } = await testHelpers.getOauthFromRefreshToken(user_id, refresh_token);
  console.log('oauth_key: ', oauth_key);
});

xit('expect social doc len to decrease by one after deletion', async () => {
  const { user_id, refresh_token } = await testHelpers.getUserIdAndRefreshTokenByCreatingUser();
  const { oauth_key } = await testHelpers.getOauthFromRefreshToken(user_id, refresh_token);

  const { data: { documents } } = await testHelpers.createDocWithMinRequirements(
    user_id,
    refresh_token,
    oauth_key
  );

  const socialDocLenBeforeDelete = documents[0].social_docs.length;

  await new Promise(res => {
    setTimeout(async () => {
      res();
    }, 10000);
  });

  let response;
  response = await testHelpers.endUserApiReqs.GET_USER();

  const socialDocIds = [];
  response.data.documents[0].social_docs.forEach(({ document_type, id, document_value }) => {
    if (document_type === 'FACEBOOK') {
      socialDocIds.push({ id });
    }
  });

  try {
    const deleteResponse = await testHelpers.endUserApiReqs.PATCH_DELETE_EXSITING_SUB_DOCS({
      base_document_id: documents[0].id,
      socialDocIds,
    });
  } catch (error) {
    console.log('error: ', error.response.data.error.en);
  }

  response = await testHelpers.endUserApiReqs.GET_USER();
  const socilDocLenAfterDelete = response.data.documents[0].social_docs.length;
  expect(socilDocLenAfterDelete).to.equal(socialDocLenBeforeDelete - 1);
});

it.only('update baseDoc and subDoc values', async () => {
  const { user_id, refresh_token } = await testHelpers.getUserIdAndRefreshTokenByCreatingUser();
  const { oauth_key } = await testHelpers.getOauthFromRefreshToken(user_id, refresh_token);

  const { data: { documents } } = await testHelpers.createDocWithMinRequirements(
    user_id,
    refresh_token,
    oauth_key
  );

  const documentObj = {
    id: documents[0].id,
    email: 'chnaged_email',
    phone_number: 'chnaged_phone_number',
    ip: '1.0.0.0.1',
    name: 'Changed Name',
    alias: 'chnaged_alias',
    entity_type: 'M',
    entity_scope: 'Airport',
    day: 1,
    month: 1,
    year: 2000,
    address_street: 'chnaged_address_street',
    address_city: 'chnaged_address_city',
    address_subdivision: 'chnaged_address_subdivision',
    address_postal_code: 'chnaged_address_postal_code',
    address_country_code: 'US',
    social_docs: [
      {
        id: documents[0].social_docs[0].id,
        document_value: 'chnaged_FACEBOOK',
        document_type: 'FACEBOOK',
      },
    ],
  };

  try {
    const { data } = await testHelpers.endUserApiReqs.PATCH_UPDATE_EXISTING_DOCUMENT({
      documentObj,
    });
    console.log('data: ', JSON.stringify(data));
  } catch (error) {
    console.log('error: ', error.response.data.error.en);
  }
});
