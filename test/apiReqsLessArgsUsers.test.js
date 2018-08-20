const { expect } = require('chai');

const {
  GET_USERS,
  POST_CREATE_USER,
  GET_USER,
  PATCH_ADD_DOCUMENTS,
  PATCH_UPDATE_EXISTING_DOCUMENT,
  PATCH_DELETE_EXSITING_MAIN_DOC,
  PATCH_DELETE_EXSITING_SUB_DOCS,
  PATCH_UPDATE_USER,
} = require('../constants/apiReqNames');

const ApiReqsLessArgs = require('../sampleApiReqs/ApiReqsLessArgs');

const apiReqsLessArgs = new ApiReqsLessArgs({
  host: 'https://uat-api.synapsefi.com',
  client_id: 'client_id_QCtyDlz7TMfeB8PxjYkagi2FL5WJ6qOKE1uAHvc3',
  client_secret: 'client_secret_vj1OLWpHEDBcZxXaKqt0mVYd2J6egyhPkAQ9fnUT',
  oauth_key: 'oauth_AQO0t1nlM4EmeBYVaCR09gxUhL6id7csfupjX5vo',
  fingerprint: '31ee56fb53272d20d1a24381a1825e3d',
  user_id: '5b17070501db700049a19bdc',
});

it('gets clients users data', async () => {
  const { data: { users_count } } = await apiReqsLessArgs.GET_USERS();

  expect(typeof users_count).to.equal('number');
});

it('creates user', async () => {
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

// expect(1+1).to.equal(2)
