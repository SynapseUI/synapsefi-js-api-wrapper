const { GET_USERS, POST_CREATE_USER, GET_USER } = require('./constants/apiReqNames');
const sampleApiRequests = require('./sampleApiReqs/sampleApiRequests');
const reqBodies = require('./sampleReqBodies/reqBodies');



// sampleApiRequests.users[GET_USERS]().then(({ data }) => {
//   console.log('data: ', data);
// });

// sampleApiRequests.users[POST_CREATE_USER](reqBodies.users[POST_CREATE_USER]).then(({ data }) => {
//   console.log('data: ', data);
// });

const userId = '5b17070501db700049a19bdc';
sampleApiRequests.users[GET_USER](userId).then(({ data }) => {
  console.log('data: ', data);
});
