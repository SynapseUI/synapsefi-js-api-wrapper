
---

- POST_CREATE_TRANSACTION
- GET_TRANSACTION
- PATCH_COMMENT_ON_STATUS
- DELETE_TRANSACTION
- GET_ALL_CLIENT_TRANSACTIONSS
- GET_ALL_USER_TRANSACTIONS
- GET_ALL_NODE_TRANSACTIONS

---

- POST_CREATE_TRANSACTION
  - create 2 deposit nodes
  - > create transaction
  - `expect from node id and from user id to match input`
  - delete transaction

---

- GET_TRANSACTION
  - create 2 deposit nodes
  - create transaction
  - get transaction
  - `expect from node id and from user id to match input`
  - delete transaction

---

- PATCH_COMMENT_ON_STATUS
  - create 2 deposit nodes
  - create transaction
  - > add comment
  - `expect comment`
  - delete transaction

---

- DELETE_TRANSACTION
  - create 2 deposit nodes
  - create transaction
  - > delete transaction
  - `expect cancel`

---

- create user 1 -> create node 1
- create user 2 -> create node 2
- create node for platform

- make transaction from platform node to user 1 node
- make transaction from user 1 node 1 to user 2 node 2

--> deleteall transaction

- GET_ALL_CLIENT_TRANSACTIONSS
  - > get all client transactions
  - `expect to see platform user 1 user 2`

---

- GET_ALL_USER_TRANSACTIONS
  - > get all user transactions
  - `expect to see platform and user 1`

---

- GET_ALL_NODE_TRANSACTIONS
  - > get all platform node transactions
  - `expect to see platform and user 1`

---








