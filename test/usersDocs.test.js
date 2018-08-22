// const { expect } = require('chai');
// const partsOfReqBody = require('../sampleData/partsOfReqBody');
// const apiReqWithLessArgs = require('./apiReqsWithLessArgs');
// const docsHaveStatusReviewing = require('../helpers/docsHaveStatusReviewing');

// const countCurrnetDocsLen = async () => {
//   const { data: { documents } } = await apiReqWithLessArgs.GET_USER();
//   console.log('current doc len:', documents.length);
//   return documents;
// };

// beforeEach(async () => {
//   await countCurrnetDocsLen();
// });

// describe(`
//   create base doc before each test
//   delete base doc after each test
// `, () => {
//   let docId;

//   // CREATE new doc before each test
//   beforeEach(async () => {
//     const { data: { documents } } = await apiReqWithLessArgs.PATCH_ADD_DOCUMENTS({
//       ...partsOfReqBody.PATCH_ADD_DOCUMENTS,
//       email: 'normal4@gmail.com',
//     });

//     const targetDocument = documents[documents.length - 1];
//     console.log('--- CREATE DOC ---');
//     console.log('create documents', documents.length);
//     console.log('\n');
//     docId = targetDocument.id;

//     while (true) {
//       let isReveiwing = true;

//       await new Promise(res => {
//         setTimeout(async () => {
//           const docs = await countCurrnetDocsLen();
//           console.log('\n----------------------------------------------');
//           isReveiwing = docsHaveStatusReviewing(docs);
//           console.log('----------------------------------------------\n');
//           res();
//         }, 1000);
//       });

//       if (!isReveiwing) break;
//     }
//   });

//   it('test', () => {
//     expect(1 + 1).to.equal(2);
//   });

//   // Delete doc after each test
//   afterEach(async () => {
//     const { data: { documents } } = await apiReqWithLessArgs.PATCH_DELETE_EXSITING_BASE_DOC(docId);
//     console.log('--- DELETE DOC ---');
//     console.log('delete documents: ', documents.length);
//     console.log('\n');
//   });
// });

// afterEach(async () => {
//   console.log('----------------------------------------------');
//   console.log('count donw 5 sec then count number of docs');
//   console.log('----------------------------------------------');

//   let timeCount = 5;
//   const timer = setInterval(() => {
//     console.log(`${timeCount}sec`);
//     timeCount--;
//     if (timeCount === 0) clearInterval(timer);
//   }, 1000);

//   await new Promise(res => {
//     setTimeout(async () => {
//       await countCurrnetDocsLen();
//       res();
//     }, 5000);
//   });
// });


// xit('doc len increse by one when uniq email was used for base doc creation', async () => {
//   const respFromGetUser = await apiReqWithLessArgs.GET_USER();
//   const originalDocsLen = respFromGetUser.data.documents.length;

//   const randomEmail = faker.internet.email();

//   const respFromPatchAddDocuments = await apiReqWithLessArgs.PATCH_ADD_DOCUMENTS({
//     ...partsOfReqBody.PATCH_ADD_DOCUMENTS,
//     email: randomEmail,
//   });

//   const docsLen = respFromPatchAddDocuments.data.documents.length;

//   expect(docsLen).to.equal(originalDocsLen + 1);
// });
