const { expect } = require('chai');

const platformUserApiWrapper = require('../testHelper/platformUserApiWrapper');
const testHelpersForNodes = require('../testHelper/testHelpersForNodes');
const testHelperFuncsForUsers = require('../testHelper/testHelperFuncsForUsers');

describe('GET_ALL_CLIENT_TRANSACTIONS with mongoQuery', () => {
  it.only('by user_id', async () => {
    try {
      const { data } = await platformUserApiWrapper.GET_ALL_CLIENT_TRANSACTIONS({
        mongoQuery: {
          $or: [
            { 'to.user._id': { $in: ['5ba95ed58cf5e9008cd6dbc0'] } },
            { 'from.user._id': { $in: ['5ba95ed58cf5e9008cd6dbc0'] } },
          ],
        },
      });
      // console.log('data: ', data);
      console.log('data: ', data.trans[0].to.user._id);
      console.log('data: ', data.trans[0].from.user._id);
    } catch (error) {
      console.log('error: ', error.response.data.error.en);
      throw new Error(error);
    }
  });

  it.only('by node_id', async () => {
    try {
      const { data } = await platformUserApiWrapper.GET_ALL_CLIENT_TRANSACTIONS({
        mongoQuery: {
          $or: [
            { 'to.id': { $in: ['5ba95ed34d1d6200a9737c8c'] } },
            { 'from.id': { $in: ['5ba95ed34d1d6200a9737c8c'] } },
          ],
        },
      });
      console.log('data: ', data);
    } catch (error) {
      console.log('error: ', error.response.data.error.en);
      throw new Error(error);
    }
  });

  it.only('by trans_id', async () => {
    try {
      const { data } = await platformUserApiWrapper.GET_ALL_CLIENT_TRANSACTIONS({
        mongoQuery: { _id: '5ba95ed8dbaea5007841fa4c' },
      });
      console.log('data: ', data);
      console.log('data: ', data.trans[0].from);
      console.log('data: ', data.trans[0].to);
    } catch (error) {
      console.log('error: ', error.response.data.error.en);
      throw new Error(error);
    }
  });
});
