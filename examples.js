const {
  GET_USERS,
  POST_CREATE_USER,
  GET_USER,
  PATCH_ADD_DOCUMENTS,
  PATCH_UPDATE_EXISTING_DOCUMENT,
  PATCH_DELETE_EXISTING_DOCUMENT,
} = require('./constants/apiReqNames');
const sampleApiRequests = require('./sampleApiReqs/sampleApiRequests');
const reqBodies = require('./sampleData/reqBodies');
const partsOfReqBody = require('./sampleData/partsOfReqBody');

const userId = '5b17070501db700049a19bdc';

// sampleApiRequests.users[GET_USERS]().then(({ data }) => {
//   console.log('data: ', data);
// });

// sampleApiRequests.users[POST_CREATE_USER](reqBodies[POST_CREATE_USER]).then(({ data }) => {
//   console.log('data: ', data);
// });

// const userId = '5b17070501db700049a19bdc';
// sampleApiRequests.users[GET_USER](userId).then(({ data }) => {
//   console.log('data: ', data);
// });

// const documentObj = partsOfReqBody[PATCH_ADD_DOCUMENTS];
// sampleApiRequests.users
//   [PATCH_ADD_DOCUMENTS](userId, documentObj)
//   .then(({ data }) => {
//     console.log('data: ', data);
//   })
//   .catch(err => {
//     // console.log('err: ', err);
//     console.log('err!!!');
//   });

// const documentObj = partsOfReqBody[PATCH_UPDATE_EXISTING_DOCUMENT];
// sampleApiRequests.users
//   [PATCH_UPDATE_EXISTING_DOCUMENT](userId, documentObj)
//   .then(({ data }) => {
//     console.log('data: ', data);
//   })
//   .catch(err => {
//     console.log('err!!!');
//   });

// const documentObj = partsOfReqBody[PATCH_UPDATE_EXISTING_DOCUMENT];
// sampleApiRequests.users
//   [PATCH_UPDATE_EXISTING_DOCUMENT](userId, documentObj)
//   .then(({ data }) => {
//     console.log('data: ', data);
//   })
//   .catch(err => {
//     // console.log('err: ', err);
//     console.log('err!!!');
//   });

sampleApiRequests.users
  [PATCH_DELETE_EXISTING_DOCUMENT](
    userId,
    '00704fea2ea93de4792fd61992679072c84d4f11807fba181e8dd252bb9fe8e4' // documentId
  )
  .then(({ data }) => {
    console.log('data: ', data);
  })
  .catch(err => {
    // console.log('err: ', err);
    console.log('err!!!');
  });

