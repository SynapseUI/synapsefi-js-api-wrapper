const { expect } = require('chai');

const addDeleteDocument = require('../../helpers/addDeleteDocument');

it('addDeleteDocument', () => {
  const subDocIds = ['1', '2', '3'];

  expect(addDeleteDocument(subDocIds)).deep.equal([
    { id: '1', document_value: '', document_type: 'DELETE_DOCUMENT' },
    { id: '2', document_value: '', document_type: 'DELETE_DOCUMENT' },
    { id: '3', document_value: '', document_type: 'DELETE_DOCUMENT' },
  ]);
});
