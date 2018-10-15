module.exports = subDocIds => {
  return subDocIds.map(id => {
    return {
      id,
      document_value: 'data:image/png;base64,DUMMY_VALUE_FOR_PHYSICAL_DOCE==',
      document_type: 'DELETE_DOCUMENT',
    };
  });
};
