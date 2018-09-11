const { expect } = require('chai');
const _ = require('lodash');

const platformUserApiCannon = require('../testHelper/platformUserApiCannon');
const testHelperFuncs = require('../testHelper/testHelperFuncs');

const personalDocumentObj = {
  email: 'personal@email.com',
  phone_number: '901.111.1111',
  ip: '::1',
  name: 'Personal Name',
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
  social_docs: [
    {
      document_value: 'https://www.facebook.com/validasdf',
      document_type: 'FACEBOOK',
    },
  ],
};

const businessDocumentObj = _.cloneDeep(personalDocumentObj);
businessDocumentObj.entity_type = 'LLC';
businessDocumentObj.name = 'Business Name';
businessDocumentObj.email = 'business@email.com';

// - [x] PATCH_ADD_DOCUMENTS
//   - create user
//   - add one personal document
//   - any change with legal names ?
//   - add one business document
//   - any change wiht legal names ?
//   - `expect doc len to 2 `
//   - delete user
it.only('PATCH_ADD_DOCUMENTS', async () => {
  const { endUserApiCannon } = await testHelperFuncs.createUser({
    legal_names: ['Initial Name, Initial Name2'],
  });

  const {
    data: { legal_names: legalNameAfterPersonalDoc },
  } = await endUserApiCannon.PATCH_ADD_DOCUMENTS({
    documentObj: personalDocumentObj,
  });

  const {
    data: { legal_names: legalNameAfterBusinessDoc },
  } = await endUserApiCannon.PATCH_ADD_DOCUMENTS({
    documentObj: businessDocumentObj,
  });

  const { data: { documents, legal_names: finalLegalNames } } = await endUserApiCannon.GET_USER();
  expect(documents.length).to.equal(2);

  await testHelperFuncs.deleteMySelf(endUserApiCannon);
});
