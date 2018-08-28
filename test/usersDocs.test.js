const { expect } = require('chai');
const faker = require('faker');

//
const partsOfReqBody = require('../sampleData/partsOfReqBody');
const apiReqWithLessArgs = require('./platformApiReqs');
const docsHaveStatusReviewing = require('../helpers/docsHaveStatusReviewing');

//
const countCurrnetDocsLen = async () => {
  const { data: { documents } } = await apiReqWithLessArgs.GET_USER();
  console.log('current doc len:', documents.length);
  return documents;
};

//
const renderDocStatusUntilVarified = async () => {
  while (true) {
    let isReveiwing = true;

    await new Promise(res => {
      setTimeout(async () => {
        const docs = await countCurrnetDocsLen();
        console.log('\n----------------------------------------------');
        isReveiwing = docsHaveStatusReviewing(docs);
        console.log('----------------------------------------------\n');
        res();
      }, 1000);
    });

    if (!isReveiwing) break;
  }
};

//
const countDownFiveSecs = async () => {
  console.log('----------------------------------------------------------------');
  console.log('count down 5sec -> delete -> count number of docs');
  console.log('----------------------------------------------------------------');

  // Need time for docs to be varified by ML ---------------------------
  let timeCount = 5;
  const timer = setInterval(() => {
    console.log(`${timeCount}sec`);
    timeCount--;
    if (timeCount === 0) clearInterval(timer);
  }, 1000);

  await new Promise(res => {
    setTimeout(async () => {
      await countCurrnetDocsLen();
      res();
    }, 5000);
  });
  //--------------------------------------------------------------------
};

//
describe('Create doc then wait for docs to be varified', () => {
  let docId;

  // CREATE new doc before each test
  beforeEach(async () => {
    await countCurrnetDocsLen();

    const { data: { documents } } = await apiReqWithLessArgs.PATCH_ADD_DOCUMENTS({
      ...partsOfReqBody.PATCH_ADD_DOCUMENTS,
      email: 'normal4@gmail.com',
    });

    const targetDocument = documents[documents.length - 1];
    console.log('--- CREATE DOC ---');
    console.log('doc len after create: ', documents.length);
    console.log('\n');
    docId = targetDocument.id;

    await renderDocStatusUntilVarified();
  });

  it('doc len decrease by 1 after delete', async () => {
    await countDownFiveSecs();

    const { data: { documents } } = await apiReqWithLessArgs.PATCH_DELETE_EXSITING_BASE_DOC(docId);
    console.log('--- DELETE DOC ---');
    console.log('doc len after delete: ', documents.length);
  });
});

it('doc len increse by one when uniq email was used for base doc creation', async () => {
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
