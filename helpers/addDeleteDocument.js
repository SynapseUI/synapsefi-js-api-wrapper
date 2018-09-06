module.exports = docIdsAndValues => {
  return docIdsAndValues.map(({ id, document_value }) => {
    return {
      id,
      document_value,
      document_type: 'DELETE_DOCUMENT',
    };
  });
};
