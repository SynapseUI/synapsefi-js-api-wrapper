const { expect } = require('chai');

const platformUserApiWrapper = require('../testHelper/platformUserApiWrapper');
const testHelperFuncsForUsers = require('../testHelper/testHelperFuncsForUsers');

// - [x] PATCH_DELETE_BASE_DOC
//   - create user
//   - add doc with email "first@gmail.com"
//   - add doc with email "second@gmail.com"
//   - delete first doc
//   - `expect doc len to be 1`
describe('PATCH_DELETE_BASE_DOC', () => {
  it('PATCH_DELETE_BASE_DOC', async () => {
    const { endUserApiWrapper } = await testHelperFuncsForUsers.createUser();

    const {
      data: { documents: { 0: { id: firstDocId } } },
    } = await testHelperFuncsForUsers.addDocument({
      endUserApiWrapper,
      email: 'first@gmail.com',
    });

    const { data: { documents: beforeDocuments } } = await testHelperFuncsForUsers.addDocument({
      endUserApiWrapper,
      email: 'second@gmail.com',
    });

    const { data: { documents: afterDocuments } } = await endUserApiWrapper.PATCH_DELETE_BASE_DOC({
      documentId: firstDocId,
    });

    await testHelperFuncsForUsers.deleteMySelf(endUserApiWrapper);

    expect(beforeDocuments.length - afterDocuments.length).to.equal(1);
  });

})

