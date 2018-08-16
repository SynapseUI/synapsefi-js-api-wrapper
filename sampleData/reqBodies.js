const { POST_CREATE_USER } = require('../constants/apiReqNames');

module.exports[POST_CREATE_USER] = {
  logins: [
    {
      email: 'test@synapsefi.com',
    },
  ],
  phone_numbers: ['901.111.1111', 'test@synapsefi.com'],
  legal_names: ['Test User'],
};
