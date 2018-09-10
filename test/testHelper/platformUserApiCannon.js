const ApiFactory = require('../../ApiFactoryRelated/ApiFactory');

const platformUserApiCannonApiCannon = new ApiFactory({
  host: 'https://uat-api.synapsefi.com',
  client_id: 'client_id_HxEShtR1GVi9QaIoM6JTZnBUu8sq0CeXKplW3FPL',
  client_secret: 'client_secret_qVtj0WIeaSYdhuwsZTz53P0EADQXxKN71v6H4mbf',
  oauth_key: 'oauth_7cSblJWGhm10DF0BXisg3wdMExaetAyzK9Q8j5pL',
  fingerprint: 'cc5127b4f73f02f78bf7ff785819f899',
  user_id: '5b17070501db700049a19bdc',
  refresh_token: 'refresh_8tDqQVlYT6239WMnL4CwbuE0dJXvrBeGpRgycKs1',
  ip_address: '123.0.0.1',
});

module.exports = platformUserApiCannonApiCannon;
