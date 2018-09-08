module.exports = subDocIds => {
  return subDocIds.map(id => {
    return {
      id,
      document_value: '',
      document_type: 'DELETE_DOCUMENT',
    };
  });
};
