const {
  GET_USERS,
  POST_CREATE_USER,
  GET_USER,
  PATCH_ADD_DOCUMENTS,
} = require('./constants/apiReqNames');
const sampleApiRequests = require('./sampleApiReqs/sampleApiRequests');
const reqBodies = require('./sampleData/reqBodies');
const partsOfReqBody = require('./sampleData/partsOfReqBody');

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

const userId = '5b17070501db700049a19bdc';
const documentObj = partsOfReqBody[PATCH_ADD_DOCUMENTS];
sampleApiRequests.users
  [PATCH_ADD_DOCUMENTS](userId, documentObj)
  .then(({ data }) => {
    console.log('data: ', data);
  })
  .catch(err => {
    // console.log('err: ', err);
    console.log('err!!!');
  });
