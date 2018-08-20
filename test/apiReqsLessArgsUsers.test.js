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

// xit("gets clients's users data", async () => {
//   const { data: { users_count } } = await apiReqsLessArgs.GET_USERS();
//   console.log('users_count: ', users_count);

//   expect(typeof users_count).to.equal('number');
// });

// xit('creates user', async () => {
//   const reqBody = {
//     logins: [
//       {
//         email: 'test@synapsefi.com',
//       },
//     ],
//     phone_numbers: ['901.111.1111', 'test@synapsefi.com'],
//     legal_names: ['Test User'],
//   };

//   const { data: { legal_names } } = await apiReqsLessArgs.POST_CREATE_USER(reqBody);

//   expect(legal_names[0]).to.equal('Test User');
// });

// xit('gets selected user data', async () => {
//   const { data: { refresh_token } } = await apiReqsLessArgs.GET_USER();

//   expect(typeof refresh_token).to.equal('string');
// });

// xit('doc len increse by one when uniq email was used for base doc creation', async () => {
//   const respFromGetUser = await apiReqsLessArgs.GET_USER();
//   const originalDocsLen = respFromGetUser.data.documents.length;

//   const randomEmail = faker.internet.email();

//   const respFromPatchAddDocuments = await apiReqsLessArgs.PATCH_ADD_DOCUMENTS({
//     ...partsOfReqBody.PATCH_ADD_DOCUMENTS,
//     email: randomEmail,
//   });

//   const docsLen = respFromPatchAddDocuments.data.documents.length;

//   expect(docsLen).to.equal(originalDocsLen + 1);
// });

it('create, update, then delete base doc', async () => {
  // Get original doc len
  const respFromGetUser = await apiReqsLessArgs.GET_USER();
  const originalDocsLen = respFromGetUser.data.documents.length;
  console.log('originalDocsLen: ', originalDocsLen);

  // CREATE
  const { data: { documents } } = await apiReqsLessArgs.PATCH_ADD_DOCUMENTS({
    ...partsOfReqBody.PATCH_ADD_DOCUMENTS,
    email: 'normal2@gmail.com',
    name: 'Abc Def',
  });

  const docsLenAfterCreation = documents.length;
  console.log('docsLenAfterCreation: ', docsLenAfterCreation);
  expect(documents[docsLenAfterCreation - 1].name).to.equal('Abc Def');

  // UPDATE exsiting base doc
  const respFromPatchUpdateExsitingDoc = await apiReqsLessArgs.PATCH_UPDATE_EXISTING_DOCUMENT({
    id: documents[docsLenAfterCreation - 1].id,
    name: 'Changed Name',
  });

  const updatedDocs = respFromPatchUpdateExsitingDoc.data.documents;
  const updatedBaseDoc = updatedDocs[docsLenAfterCreation - 1];
  expect(updatedBaseDoc.name).to.equal('Changed Name');

  // Delete base doc
  const respFromPatchDeleteExsitingBaseDoc = await apiReqsLessArgs.PATCH_DELETE_EXSITING_BASE_DOC(
    documents[docsLenAfterCreation - 1].id
  );

  const remainingDocsLen = respFromPatchDeleteExsitingBaseDoc.data.documents.length;
  console.log('remainingDocsLen: ', remainingDocsLen);
  expect(remainingDocsLen).to.equal(docsLenAfterCreation - 1);

  // last count
  const respFromGetUserLast = await apiReqsLessArgs.GET_USER();
  const originalDocsLenLast = respFromGetUserLast.data.documents.length;
  console.log('originalDocsLenLast: ', originalDocsLenLast);
});

// it('delete all base documents', async () => {
//   // last count
//   const { data: { documents } } = await apiReqsLessArgs.GET_USER();
//   console.log('documents: ', documents.length);

//   const ids = documents.map(({ id }) => {
//     return { id };
//   });

//   console.log('ids: ', ids);
// });
