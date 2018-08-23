const ClassForApiReqs = require('../sampleApiReqs/ClassForApiReqs');
const platformApiReqs = require('./platformApiReqs');

const apiReqsLessArgs = new ClassForApiReqs({
  host: platformApiReqs.host,
  client_id: platformApiReqs.client_id,
  client_secret: platformApiReqs.client_secret,
  oauth_key: 'dummyOauthKey',
  fingerprint: 'dummyFingerPrint',
  user_id: 'dummyUserId',
  refresh_token: 'dummyRefreshToken',
});

module.exports = apiReqsLessArgs;
