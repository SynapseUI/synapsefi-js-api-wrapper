const { expect } = require('chai');

const platformUserApiWrapper = require('../testHelper/platformUserApiWrapper');

describe('Fetch data form /users endpoint', () => {
  it('fetch doc types (physical, social, virtual)', async () => {
    const {
      data: { physical_docs, social_docs, virtual_docs },
    } = await platformUserApiWrapper.GET_USERS_DOCUMENT_TYPES();

    expect(physical_docs.map(({ type }) => type)).to.include.members([
      'GOVT_ID',
      'SSN_CARD',
      'EIN_DOC',
    ]);

    expect(social_docs.map(({ type }) => type)).to.include.members([
      'FACEBOOK',
      'LINKEDIN',
      'EMAIL_2FA',
    ]);

    expect(virtual_docs.map(({ type }) => type)).to.include.members([
      'SSN',
      'PASSPORT',
      'DRIVERS_LICENSE',
    ]);
  });

  it('fetches entity types', async () => {
    const { data: { BUSINESS, PERSONAL } } = await platformUserApiWrapper.GET_USERS_ENTITY_TYPES();

    expect(BUSINESS).to.deep.include.members([
      { common_name: 'Limited Liability Company', type: 'LLC' },
      { common_name: 'Business Trust', type: 'TRUST' },
      { common_name: 'Individual Retirement Accounts', type: 'IRA' },
    ]);

    expect(PERSONAL).to.deep.include.members([
      { common_name: 'Male', type: 'M' },
      { common_name: 'Female', type: 'F' },
      { common_name: 'Personal Trust Account', type: 'TRUST' },
    ]);
  });

  it('fetches entity scopes', async () => {
    const { data: { scopes } } = await platformUserApiWrapper.GET_USERS_ENTITY_SCOPES();

    expect(scopes).to.include.members(['Not Known', 'Airport', 'Arts & Entertainment']);
  });
});
