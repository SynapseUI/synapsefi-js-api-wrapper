const { expect } = require('chai');

const platformUserApiWrapper = require('../testHelper/platformUserApiWrapper');
const testHelperFuncsForUsers = require('../testHelper/testHelperFuncsForUsers');

// - [X] PATCH_DELETE_SUB_DOCS
//   - create user
//   - add docs
//   - get all social doc ids
//   - delete all social docs
//   - `expect social docs legnth === 0`
//   - delete user
describe('PATCH_DELETE_SUB_DOCS', () => {
  it('PATCH_DELETE_SUB_DOCS', async () => {
    const { endUserApiWrapper } = await testHelperFuncsForUsers.createUser();
    await testHelperFuncsForUsers.addDocument({ endUserApiWrapper });

    const {
      data: { documents: { 0: { id: baseDocId, social_docs: initialSocialDocs } } },
    } = await endUserApiWrapper.GET_USER();

    // -----------------------------------------------------------------
    const {
      data: { documents: { 0: { social_docs: afterSocialDocs } } },
    } = await endUserApiWrapper.PATCH_DELETE_SUB_DOCS({
      baseDocId,
      socialDocIds: initialSocialDocs.map(({ id }) => id),
    });
    // -----------------------------------------------------------------

    expect(initialSocialDocs.length > 0).to.equal(true);
    expect(afterSocialDocs.length).to.equal(0);

    await testHelperFuncsForUsers.deleteMySelf(endUserApiWrapper);
  });

})

