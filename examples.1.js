const {
  GET_USERS,
  POST_CREATE_USER,
  GET_USER,
  PATCH_ADD_DOCUMENTS,
  PATCH_UPDATE_EXISTING_DOCUMENT,
  PATCH_DELETE_EXSITING_MAIN_DOC,
  PATCH_DELETE_EXSITING_SUB_DOCS,
  PATCH_UPDATE_USER,
} = require('./constants/apiReqNames');
const Test = require('./sampleApiReqs/testSampleApiReq');
const reqBodies = require('./sampleData/reqBodies');
const partsOfReqBody = require('./sampleData/partsOfReqBody');

const user_id = '5b17070501db700049a19bdc';

const host = 'https://uat-api.synapsefi.com';
// const user_id = '5b17070501db700049a19bdc';
const oauth_key = 'oauth_AQO0t1nlM4EmeBYVaCR09gxUhL6id7csfupjX5vo';
const client_id = 'client_id_QCtyDlz7TMfeB8PxjYkagi2FL5WJ6qOKE1uAHvc3';
const client_secret = 'client_secret_vj1OLWpHEDBcZxXaKqt0mVYd2J6egyhPkAQ9fnUT';
const fingerprint = '31ee56fb53272d20d1a24381a1825e3d';

const test = new Test({
  host,
  client_id,
  client_secret,
  oauth_key,
  fingerprint,
  user_id,
});

test.GET_USER().then(({ data }) => {
  console.log('data: ', data);
});
