const { PATCH_ADD_DOCUMENTS, PATCH_UPDATE_EXISTING_DOCUMENT } = require('../constants/apiReqNames');

module.exports[PATCH_ADD_DOCUMENTS] = {
  email: 'atest@test.com',
  phone_number: '901.111.1111',
  ip: '::1',
  name: 'Test User',
  alias: 'Test',
  entity_type: 'M',
  entity_scope: 'Arts & Entertainment',
  day: 2,
  month: 5,
  year: 1989,
  address_street: '1 Market St.',
  address_city: 'SF',
  address_subdivision: 'CA',
  address_postal_code: '94114',
  address_country_code: 'US',
  virtual_docs: [
    {
      document_value: '2222',
      document_type: 'SSN',
    },
  ],
  physical_docs: [
    {
      document_value: 'data:image/gif;base64,SUQs==',
      document_type: 'GOVT_ID',
    },
  ],
  social_docs: [
    {
      document_value: 'https://www.facebook.com/valid',
      document_type: 'FACEBOOK',
    },
  ],
};

module.exports[PATCH_UPDATE_EXISTING_DOCUMENT] = {
  id: '13b1fa97d147a33bad0d8d5d32c15e28c42804dd16486249f0931e245e30e835',
  name: '123',
};
