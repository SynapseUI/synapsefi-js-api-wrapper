- [x] GET_ALL_CLIENT_USERS
  - base -> has key users_count

  - search name
    - create user name with "Search Yes"
    - create user name with "Search No"
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

- [x] PATCH_ADD_NEW_DOCUMENTS
  - create user
  - add one personal document
  - any change with legal names ?
  - add one business document 
  - any change wiht legal names ?
  - `expect doc len to 2`
  - delete user


- [X] PATCH_UPDATE_DOCUMENTS
  - update base doc
    - create user
    - add doc with email "test@gmail.com"
    - update email to "update@gmail.com"
    - `expect eamil to be "update@gmail.com"`
    - delete user

  - update sub docs
    - create user
    - add doc with facebook document_value: https://www.facebook.com/beforeUpdate
    - update facebook value to https://www.facebook.com/afterUpdate
    - `expect main doc id to be same`
    - `expect facebook value to be "https://www.facebook.com/afterUpdate"`
    - delete user


- [x] PATCH_DELETE_BASE_DOC
  - create user
  - add doc with email "first@gmail.com"
  - add doc with email "second@gmail.com"
  - delete first doc
  - `expect doc len to be 1`


- [X] PATCH_DELETE_SUB_DOCS
  - create user
  - add doc (has facebook by default)
  - get all social doc ids
  - delete all social docs
  - `expect social docs legnth === 0`
  - delete user


- [X] PATCH_UPDATE_USER
  - add and remove legal_name
    - create user with legal_names ["User One"]
    - add legal_name "User Two" 
    - add legal_name "User Three"
    - add remove_legal_name "User Two"
    - add remove_legal_name "User Three"
    - `expect legal_name to increase then decrease`
    - delete user
    - ? what happen if I remove all legal names ?
  

- [X] PATCH_UPDATE_USER
  - update legal name, login email, password, and phone number
    - create user with legal_names ["Before User"], email: before@email.com, phone_number: 1231231233
    - add legal name "After User", 
    - add login email -> update@email.com, password: test1234
    - add phone_number -> 9879879877
    - remove legal_name "Before User"
    - remove phone_number "1231231233"
    - remove email before@email.com
    - `expect legal_name to be User Two`
    - `expect login email: update@email.com`
    - `expect phone number to be 9879879877`
    - delete user

  - update cip_tag, public_note
    - create uesr
    - update cip_tag to PLATFORM
    - update public_note to "updated public note"
    - `expect cip tag to be "PLATFORM"`
    - `expect public note to be "PLATFORM"`
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