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

it.only('create doc with minimum requirement', async () => {
  const { user_id, refresh_token } = await testHelpers.getUserIdAndRefreshTokenByCreatingUser();
  const { oauth_key } = await testHelpers.getOauthFromRefreshToken(user_id, refresh_token);

  const { data: { documents } } = await testHelpers.createDocWithMinRequirements(
    user_id,
    refresh_token,
    oauth_key
  );

  const { social_docs } = documents[0];
  console.log('social_docs: ', social_docs);

  social_docs.map(({ id, document_value, document_type }) => {
    console.log('id: ', id);
    console.log('document_value: ', document_value);
    console.log('document_type: ', document_type);
  });

  await new Promise(res => {
    setTimeout(async () => {
      res();
    }, 10000);
  });

  let response;
  response = await testHelpers.endUserApiReqs.GET_USER();
  console.log('response: ', response.data.documents[0].social_docs);

  const socialDocIdsAndValues = [];
  response.data.documents[0].social_docs.forEach(({ document_type, id, document_value }) => {
    if (document_type === 'FACEBOOK') {
      socialDocIdsAndValues.push({ id, document_value });
    }
  });

  try {
    const deleteResponse = await testHelpers.endUserApiReqs.PATCH_DELETE_EXSITING_SUB_DOCS({
      base_document_id: documents[0].id,
      socialDocIdsAndValues,
    });
    console.log('deleteResponse: ', deleteResponse.data.documents[0].social_docs);
  } catch (error) {
    console.log('error: ', error.response.data.error.en);
  }

  // response = await testHelpers.endUserApiReqs.GET_USER();
  // console.log('response: ', response.data.documents[0].social_docs);
});
