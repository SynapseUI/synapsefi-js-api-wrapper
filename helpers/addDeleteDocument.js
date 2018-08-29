module.exports = subDocIds => {
  return subDocIds.map(id => {
    return {
      id,
      permission_scope: 'DELETE_DOCUMENT',
    };
  });
};
