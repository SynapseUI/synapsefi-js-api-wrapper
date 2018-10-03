const { expect } = require('chai');
const _ = require('lodash');

const platformUserApiWrapper = require('../testHelper/platformUserApiWrapper');
const testHelperFuncsForUsers = require('../testHelper/testHelperFuncsForUsers');

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
    const { endUserApiWrapper } = await testHelperFuncsForUsers.createUser();

    const { data: { documents: initialDocuments } } = await endUserApiWrapper.PATCH_ADD_DOCUMENT({
      documentObj,
    });

    const { id: initialDocId, email: initialEmail } = initialDocuments[0];

    expect(initialEmail).to.equal('test@gmail.com');

    const { data: { documents: afterDocuments } } = await endUserApiWrapper.PATCH_UPDATE_DOCUMENT({
      documentObj: {
        id: initialDocId,
        email: 'updated@gmail.com',
      },
    });

    const { id: afterDocId, email: afterEmail } = afterDocuments[0];

    expect(afterEmail).to.equal('updated@gmail.com');
    expect(initialDocId).to.not.equal(afterDocId);

    await testHelperFuncsForUsers.deleteMySelf(endUserApiWrapper);
  });

  // - update sub docs
  //   - create user
  //   - add doc with facebook document_value: https://www.facebook.com/beforeUpdate
  //   - update facebook value to https://www.facebook.com/afterUpdate
  //   - `expect main doc id to be same`
  //   - `expect facebook value to be "https://www.facebook.com/afterUpdate"`
  //   - delete user
  it('update sub docs', async () => {
    const { endUserApiWrapper } = await testHelperFuncsForUsers.createUser();

    const { data: { documents: initialDocuments } } = await endUserApiWrapper.PATCH_ADD_DOCUMENT({
      documentObj,
    });

    const initialDocument = initialDocuments[0];
    const initialDocId = initialDocument.id;
    const initialFacebookObj = _.find(initialDocument.social_docs, { document_type: 'FACEBOOK' });

    const { data: { documents: afterDocuments } } = await endUserApiWrapper.PATCH_UPDATE_DOCUMENT({
      documentObj: {
        id: initialDocId,
        social_docs: [
          {
            id: initialFacebookObj.id,
            document_value: 'https://www.facebook.com/afterUpdate',
            document_type: 'FACEBOOK',
          },
        ],
      },
    });

    const afterFacebookObj = _.find(afterDocuments[0].social_docs, { document_type: 'FACEBOOK' });

    expect(initialDocId).to.equal(afterDocuments[0].id);
    expect(initialFacebookObj.document_value).to.equal('https://www.facebook.com/beforeUpdate');
    expect(afterFacebookObj.document_value).to.equal('https://www.facebook.com/afterUpdate');

    await testHelperFuncsForUsers.deleteMySelf(endUserApiWrapper);
  });
});
