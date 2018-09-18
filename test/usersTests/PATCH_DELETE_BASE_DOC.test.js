const { expect } = require('chai');

const platformUserApiCannon = require('../testHelper/platformUserApiCannon');
const testHelperFuncsForUsers = require('../testHelper/testHelperFuncsForUsers');

// - [x] PATCH_DELETE_BASE_DOC
//   - create user
//   - add doc with email "first@gmail.com"
//   - add doc with email "second@gmail.com"
//   - delete first doc
//   - `expect doc len to be 1`
describe('PATCH_DELETE_BASE_DOC', () => {
  it('PATCH_DELETE_BASE_DOC', async () => {
    const { endUserApiCannon } = await testHelperFuncsForUsers.createUser();

    const {
      data: { documents: { 0: { id: firstDocId } } },
    } = await testHelperFuncsForUsers.addDocument({
      endUserApiCannon,
      email: 'first@gmail.com',
    });

    const { data: { documents: beforeDocuments } } = await testHelperFuncsForUsers.addDocument({
      endUserApiCannon,
      email: 'second@gmail.com',
    });

    const { data: { documents: afterDocuments } } = await endUserApiCannon.PATCH_DELETE_BASE_DOC({
      documentId: firstDocId,
    });

    await testHelperFuncsForUsers.deleteMySelf(endUserApiCannon);

    expect(beforeDocuments.length - afterDocuments.length).to.equal(1);
  });

})

