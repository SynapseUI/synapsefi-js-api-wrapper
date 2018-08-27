const { expect } = require('chai');
const { POST_CREATE_NODE } = require('../constants/apiReqNames');

const reqBodyForCreateNode = require('../sampleData/reqBodyForCreateNode');

const platformApiReqs = require('./platformApiReqs');

xit('create deposit accounts', async () => {
  try {
    const { data } = await platformApiReqs.POST_CREATE_NODE(reqBodyForCreateNode.DEPOSIT_ACCOUNT);
    console.log('data: ', data);
    // console.log('data: ', data.error);
  } catch (error) {
    // console.log(Object.keys(error.response.data.error.en));
    console.log('error.response.data.error.en: ', error.response.data.error.en);

    // console.log('error: ', error);
  }

  // const { data } = await platformApiReqs.POST_CREATE_NODE(reqBodyForCreateNode.DEPOSIT_ACCOUNT);
  // console.log('data: ', data);
});

it.only('get all user nodes (resp has `node_count` as key n value is `number`)', async () => {
  const { data: { node_count } } = await platformApiReqs.GET_ALL_USER_NODES();
  expect(typeof node_count).to.equal('number');
});
