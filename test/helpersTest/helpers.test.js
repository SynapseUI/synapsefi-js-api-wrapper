const { expect } = require('chai');

const addDeleteDocument = require('../../helpers/addDeleteDocument');

it('addDeleteDocument', () => {
  const subDocIds = ['1', '2', '3'];

  expect(addDeleteDocument(subDocIds)).deep.equal([
    { id: '1', permission_scope: 'DELETE_DOCUMENT' },
    { id: '2', permission_scope: 'DELETE_DOCUMENT' },
    { id: '3', permission_scope: 'DELETE_DOCUMENT' },
  ]);
});
