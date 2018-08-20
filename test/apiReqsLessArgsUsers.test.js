const faker = require('faker');
const { expect } = require('chai');

const partsOfReqBody = require('../sampleData/partsOfReqBody');

const ApiReqsLessArgs = require('../sampleApiReqs/ApiReqsLessArgs');

const apiReqsLessArgs = new ApiReqsLessArgs({
  host: 'https://uat-api.synapsefi.com',
  client_id: 'client_id_QCtyDlz7TMfeB8PxjYkagi2FL5WJ6qOKE1uAHvc3',
  client_secret: 'client_secret_vj1OLWpHEDBcZxXaKqt0mVYd2J6egyhPkAQ9fnUT',
  oauth_key: 'oauth_AQO0t1nlM4EmeBYVaCR09gxUhL6id7csfupjX5vo',
  fingerprint: '31ee56fb53272d20d1a24381a1825e3d',
  user_id: '5b17070501db700049a19bdc',
});

xit("gets clients's users data", async () => {
  const { data: { users_count } } = await apiReqsLessArgs.GET_USERS();
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

  const { data: { legal_names } } = await apiReqsLessArgs.POST_CREATE_USER(reqBody);

  expect(legal_names[0]).to.equal('Test User');
});

xit('gets selected user data', async () => {
  const { data: { refresh_token } } = await apiReqsLessArgs.GET_USER();

  expect(typeof refresh_token).to.equal('string');
});

xit('gets selected user data', async () => {
  const { data: { refresh_token } } = await apiReqsLessArgs.GET_USER();

  expect(typeof refresh_token).to.equal('string');
});

// let originalDocsLength;

// beforeEach(async () => {
//   const { data: { documents } } = await apiReqsLessArgs.GET_USER();
//   originalDocsLength = documents.length;
// });

it('doc len increse by one when uniq email was used during doc creation', async () => {
  const respFromGetUser = await apiReqsLessArgs.GET_USER();
  const originalDocsLen = respFromGetUser.data.documents.length;

  const randomEmail = faker.internet.email();

  const respFromPatchAddDocuments = await apiReqsLessArgs.PATCH_ADD_DOCUMENTS({
    ...partsOfReqBody.PATCH_ADD_DOCUMENTS,
    email: randomEmail,
  });

  const docsLen = respFromPatchAddDocuments.data.documents.length;

  expect(docsLen).to.equal(originalDocsLen + 1);
});
