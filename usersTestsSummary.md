- [x] GET_USERS
  - base -> has key users_count

  - search name
    - create user name with "Search Name"
    - create user name with "Dont Search"
    - search ny name
    - `expect found users to have name "Search Name"`
    - delete both users

  - page, per_page 
    - invoke with page: 2, per_page 2
    - `expext page = page, limit = 2`

  - query, per_page, page
    - create user email with "real@gmail.com"
    - create user email with "fake@gmail.com"
    - query will be email "real@gmail.com"
    - `expext page = 1, limit = 2, user with email: "real@gmail.com"`
    - delete both users

- [x] POST_CREATE_USER
  - create user legal_name with "Post User"
  - `expect get user to have response with legal name "Post User"`
  - delete user


- [x] GET_USER
  - create user legal_name with "Get User"
  - `expect get user to have response with legal name "Get User"`

- [x] PATCH_ADD_DOCUMENTS
  - create user
  - add one personal document
  - any change with legal names ?
  - add one business document 
  - any change wiht legal names ?
  - `expect doc len to 2 `
  - delete user


- [X] PATCH_UPDATE_EXISTING_DOCUMENT
  - create user
  - add doc with email "test@gmail.com"
  - update email to "update@gmail.com"
  - `expect eamil to be "update@gmail.com"`
  - delete user


- [x] PATCH_DELETE_EXSITING_BASE_DOC
  - create user
  - add doc with email "first@gmail.com"
  - add doc with email "second@gmail.com"
  - delete first doc
  - `expect doc len to be 1`


- [X] PATCH_DELETE_EXSITING_SUB_DOCS
  - create user
  - add doc (has facebook by default)
  - delete facebook and email (both social docs)
  - doc should not have facebook and email
  - `expect social doc to not have facebook and email`
  - delete user


- [X] PATCH_UPDATE_USER
  - create user with legal name ["Before Update"]
  - update legal name to ["After Update"]
  - `expect response from get user to have legal name "After Update"`
  - delete user


- [x] PATCH_USER_PERMISSION
  - Lock user
    - create user
    - lock user
    - `expect response from get user to have permission: LOCKED`
    - delete user

  - Delete user
    - create user
    - delete user
    - `expect response from get user to have permission: MAKE-IT-GO-AWAY`
    - delete user