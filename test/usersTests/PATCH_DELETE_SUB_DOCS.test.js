const { expect } = require('chai');

const platformUserApiCannon = require('../testHelper/platformUserApiCannon');
const testHelperFuncsForUsers = require('../testHelper/testHelperFuncsForUsers');

// - [X] PATCH_DELETE_SUB_DOCS
//   - create user
//   - add docs
//   - get all social doc ids
//   - delete all social docs
//   - `expect social docs legnth === 0`
//   - delete user
it('PATCH_DELETE_SUB_DOCS', async () => {
  const { endUserApiCannon } = await testHelperFuncsForUsers.createUser();
  await testHelperFuncsForUsers.addDocument({ endUserApiCannon });

  const {
    data: { documents: { 0: { id: baseDocId, social_docs: initialSocialDocs } } },
  } = await endUserApiCannon.GET_USER();

  // -----------------------------------------------------------------
  const {
    data: { documents: { 0: { social_docs: afterSocialDocs } } },
  } = await endUserApiCannon.PATCH_DELETE_SUB_DOCS({
    baseDocId,
    socialDocIds: initialSocialDocs.map(({ id }) => id),
  });
  // -----------------------------------------------------------------

  expect(initialSocialDocs.length > 0).to.equal(true);
  expect(afterSocialDocs.length).to.equal(0);

  await testHelperFuncsForUsers.deleteMySelf(endUserApiCannon);
});
