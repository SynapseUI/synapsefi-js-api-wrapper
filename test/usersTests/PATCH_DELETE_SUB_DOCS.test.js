const { expect } = require('chai');

const platformUserApiCannon = require('../testHelper/platformUserApiCannon');
const testHelperFuncs = require('../testHelper/testHelperFuncs');

// - [X] PATCH_DELETE_SUB_DOCS
//   - create user
//   - add docs
//   - get all social doc ids
//   - delete all social docs
//   - `expect social docs legnth === 0`
//   - delete user
it('PATCH_DELETE_SUB_DOCS', async () => {
  const { endUserApiCannon } = await testHelperFuncs.createUser();
  await testHelperFuncs.addDocument({ endUserApiCannon });

  const {
    data: { documents: { 0: { id: baseDocId, social_docs } } },
  } = await endUserApiCannon.GET_USER();

  // -----------------------------------------------------------------
  await endUserApiCannon.PATCH_DELETE_SUB_DOCS({
    baseDocId,
    socialDocIds: social_docs.map(({ id }) => id),
  });
  // -----------------------------------------------------------------

  const {
    data: { documents: { 0: { social_docs: socialDocsAfter } } },
  } = await endUserApiCannon.GET_USER();

  await testHelperFuncs.deleteMySelf(endUserApiCannon);

  expect(socialDocsAfter.length).to.equal(0);
});
