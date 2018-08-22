const { expect } = require('chai');

const apiReqsWithLessArgs = require('./apiReqsWithLessArgs');

it('fetch doc types', async () => {
  const {
    data: { physical_docs, social_docs, virtual_docs },
  } = await apiReqsWithLessArgs.GET_USERS_DOCUMENT_TYPES();

  expect(physical_docs.map(({ type }) => type)).to.include.members([
    'GOVT_ID',
    'SSN_CARD',
    'EIN_DOC',
  ]);

  social_docs.map(({ type }) => {
    console.log('s type: ', type);
    return type;
  });

  virtual_docs.map(({ type }) => {
    console.log('v type: ', type);
    return type;
  });
});
