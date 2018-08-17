const addPermissionScopeDeleteDocument = require('../addPermissionScopeDeleteDocument');

test('addPermissionScopeDeleteDocument', () => {
  const input = [{ id: '1' }, { id: '2' }, { id: '3' }];

  expect(addPermissionScopeDeleteDocument(input)).toEqual([
    { id: '1', permission_scope: 'DELETE_DOCUMENT' },
    { id: '2', permission_scope: 'DELETE_DOCUMENT' },
    { id: '3', permission_scope: 'DELETE_DOCUMENT' },
  ]);
});
