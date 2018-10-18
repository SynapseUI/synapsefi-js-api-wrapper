const { expect } = require('chai');
const _ = require('lodash');

const testHelperFuncsForUsers = require('../testHelper/testHelperFuncsForUsers');

const personalDocumentArr = [
  {
    email: 'personal@email.com',
    phone_number: '1231231233',
    ip: '127.0.0.1',
    name: 'Personal Name',
    alias: 'Test',
    entity_type: 'M',
    entity_scope: 'Arts & Entertainment',
    day: 2,
    month: 5,
    year: 1989,
    address_street: '101 2nd St',
    address_city: 'SF',
    address_subdivision: 'CA',
    address_postal_code: '94105',
    address_country_code: 'US',
    social_docs: [
      {
        document_value: 'https://www.facebook.com/validasdf',
        document_type: 'FACEBOOK',
      },
    ],
  },
];

const businessDocArr = _.cloneDeep(personalDocumentArr);
businessDocArr[0].entity_type = 'LLC';
businessDocArr[0].name = 'Business Name';
businessDocArr[0].email = 'business@email.com';

// - [x] PATCH_ADD_NEW_DOCUMENTS
//   - create user
//   - add one personal document
//   - any change with legal names ?
//   - add one business document
//   - any change wiht legal names ?
//   - `expect doc len to 2 `
//   - delete user

describe('PATCH_ADD_NEW_DOCUMENTS', () => {
  it('PATCH_ADD_NEW_DOCUMENTS', async () => {
    const { endUserApiWrapper } = await testHelperFuncsForUsers.createUser({
      legal_names: ['Initial Name, Initial Name2'],
    });

    await endUserApiWrapper.PATCH_ADD_NEW_DOCUMENTS({
      documents: personalDocumentArr.concat(businessDocArr),
    });

    const { data: { documents } } = await endUserApiWrapper.GET_USER();
    expect(documents.length).to.equal(2);

    await testHelperFuncsForUsers.deleteMySelf(endUserApiWrapper);
  });
});
