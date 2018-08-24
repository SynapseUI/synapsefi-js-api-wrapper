
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
expect response to have key `users_count`
`users_count` should be number

- get one user data with user_id
expect response to have key `refresh_token`
`refresh_token` should be string

- create user -> delete user (change user permission to `MAKE-IT-GO-AWAY`)
expect users count to decrease by 1 after deleting user



---

## NODES





