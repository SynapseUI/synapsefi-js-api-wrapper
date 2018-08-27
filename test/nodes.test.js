const { POST_CREATE_NODE } = require('../constants/apiReqNames');

const reqBodyForCreateNode = require('../sampleData/reqBodyForCreateNode');

const platformApiReqs = require('./platformApiReqs');

it.only('create deposit accounts', async () => {
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
