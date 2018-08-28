
# Test Summary

## Fetch Data

### Get document type
- physical_docs -> GOVT_ID, SSN_CARD, ...
- social_docs -> FACEBOOK, LINKEDIN, ...
- virtual_docs -> SSN , PASSPORT, ...

### Fetch entity types
- BUSINESS scopes -> LLC, TRUST, ...
- PERSONAL scopes -> M, F, TRUST, ...

### Fetch entity scopes
- Not Known, Airport

---

## USERS

- get all platform's users
expect response to have key `users_count` which should be `number`

- get one user data with user_id
expect response to have key `refresh_token` which should be `string`

- create user -> delete user (change user permission to `MAKE-IT-GO-AWAY`)
expect users count to decrease by 1 after deleting user


---

## NODES

- get all nodes from one user
reponse to have key `node_count` which should be `number`

- get all nodes with type `DEPOSIT_US`
reponse shoule only contain type `DEPOSIT_US`

- get all nodes per_page(limit)=`3`, page=`2`
reponse shoule have limit=`3`, page=`2`

- create deposit node -> delete just created deposit node
node count should increase by 1 then decrease by 1




