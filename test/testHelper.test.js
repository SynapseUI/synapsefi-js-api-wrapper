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

it('Update documnet', async () => {
  const { user_id, refresh_token } = await testHelpers.getUserIdAndRefreshTokenByCreatingUser();
  const { oauth_key } = await testHelpers.getOauthFromRefreshToken(user_id, refresh_token);

  const { data: { documents } } = await testHelpers.createDocWithMinRequirements(
    user_id,
    refresh_token,
    oauth_key
  );
  
}