const faker = require('faker');
const { expect } = require('chai');

const partsOfReqBody = require('../sampleData/partsOfReqBody');

const apiReqWithLessArgs = require('./apiReqsWithLessArgs');

xit("gets clients's users data", async () => {
  const { data: { users_count } } = await apiReqWithLessArgs.GET_USERS();
  console.log('users_count: ', users_count);

  expect(typeof users_count).to.equal('number');
});

xit('creates user', async () => {
  const reqBody = {
    logins: [
      {
        email: 'test@synapsefi.com',
      },
    ],
    phone_numbers: ['901.111.1111', 'test@synapsefi.com'],
    legal_names: ['Test User'],
  };

  const { data: { legal_names } } = await apiReqWithLessArgs.POST_CREATE_USER(reqBody);

  expect(legal_names[0]).to.equal('Test User');
});

xit('gets selected user data', async () => {
  const { data: { refresh_token } } = await apiReqWithLessArgs.GET_USER();

  expect(typeof refresh_token).to.equal('string');
});

xit('doc len increse by one when uniq email was used for base doc creation', async () => {
  const respFromGetUser = await apiReqWithLessArgs.GET_USER();
  const originalDocsLen = respFromGetUser.data.documents.length;

  const randomEmail = faker.internet.email();

  const respFromPatchAddDocuments = await apiReqWithLessArgs.PATCH_ADD_DOCUMENTS({
    ...partsOfReqBody.PATCH_ADD_DOCUMENTS,
    email: randomEmail,
  });

  const docsLen = respFromPatchAddDocuments.data.documents.length;

  expect(docsLen).to.equal(originalDocsLen + 1);
});
