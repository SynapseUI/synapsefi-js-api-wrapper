const { expect } = require('chai');
const _ = require('lodash');

const platformUserApiCannon = require('../testHelper/platformUserApiCannon');
const testHelperFuncs = require('../testHelper/testHelperFuncs');

const documentObj = {
  email: 'test@gmail.com',
  phone_number: '1231231233',
  ip: '127.0.0.1',
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
      document_value: 'https://www.facebook.com/beforeUpdate',
      document_type: 'FACEBOOK',
    },
  ],
};

describe('PATCH_UPDATE_DOCUMENT', () => {
  // - update base doc
  //   - create user
  //   - add doc with email "test@gmail.com"
  //   - update email to "update@gmail.com"
  //   - `expect eamil to be "update@gmail.com"`
  //   - delete user
  it('update base doc', async () => {
    const { endUserApiCannon } = await testHelperFuncs.createUser();

    const { data: { documents: initialDocuments } } = await endUserApiCannon.PATCH_ADD_DOCUMENT({
      documentObj,
    });

    const { id: initialDocId, email: initialEmail } = initialDocuments[0];

    expect(initialEmail).to.equal('test@gmail.com');

    const {
      data: { documents: afterDocuments },
    } = await endUserApiCannon.PATCH_UPDATE_DOCUMENT({
      documentObj: {
        id: initialDocId,
        email: 'updated@gmail.com',
      },
    });

    const { id: afterDocId, email: afterEmail } = afterDocuments[0];

    expect(afterEmail).to.equal('updated@gmail.com');
    expect(initialDocId).to.not.equal(afterDocId);

    await testHelperFuncs.deleteMySelf(endUserApiCannon);
  });

  // - update sub docs
  //   - create user
  //   - add doc with facebook document_value: https://www.facebook.com/beforeUpdate
  //   - update facebook value to https://www.facebook.com/afterUpdate
  //   - `expect main doc id to be same`
  //   - `expect facebook value to be "https://www.facebook.com/afterUpdate"`
  //   - delete user
  it('update sub docs', async () => {
    const { endUserApiCannon } = await testHelperFuncs.createUser();

    const { data: { documents: initialDocuments } } = await endUserApiCannon.PATCH_ADD_DOCUMENT({
      documentObj,
    });

    const {
      id: initialDocId,
      social_docs: { 0: { id: facebookDocId, document_value: beforeDocValue } },
    } = initialDocuments[0];

    const {
      data: { documents: afterDocuments },
    } = await endUserApiCannon.PATCH_UPDATE_DOCUMENT({
      documentObj: {
        id: initialDocId,
        social_docs: [
          {
            id: facebookDocId,
            document_value: 'https://www.facebook.com/afterUpdate',
            document_type: 'FACEBOOK',
          },
        ],
      },
    });

    const {
      id: afterDocId,
      social_docs: { 0: { document_value: afterDocValue } },
    } = afterDocuments[0];

    expect(initialDocId).to.equal(afterDocId);
    expect(beforeDocValue).to.equal('https://www.facebook.com/beforeUpdate');
    expect(afterDocValue).to.equal('https://www.facebook.com/afterUpdate');

    await testHelperFuncs.deleteMySelf(endUserApiCannon);
  });
});
