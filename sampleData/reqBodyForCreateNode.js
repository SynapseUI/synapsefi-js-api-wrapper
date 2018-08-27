module.exports.ACH_US_WITH_LOGIN = {
  type: 'ACH-US',
  info: {
    bank_id: 'synapse_good',
    bank_pw: 'test1234',
    bank_name: 'fake',
  },
};

module.exports.ACH_US_WITH_MFA = {
  access_token: 'fake_cd60680b9addc013ca7fb25b2b70',
  mfa_answer: 'test_answer',
};

module.exports.ACH_US_WITH_AC_RT = {
  type: 'ACH-US',
  info: {
    nickname: 'Fake Account',
    account_num: '1232225674134',
    routing_num: '051000017',
    type: 'PERSONAL',
    class: 'CHECKING',
  },
};

module.exports.DEPOSIT_ACCOUNT = {
  type: 'DEPOSIT-US',
  info: {
    nickname: 'My Checking',
  },
};

module.exports.DEBIT_CARD = {
  type: 'CARD-US',
  info: {
    nickname: 'My Debit Card',
    document_id: '2a4a5957a3a62aaac1a0dd0edcae96ea2cdee688ec6337b20745eed8869e3ac8',
    card_type: 'VIRTUAL',
  },
};

module.exports.INTERCHANGE_US = {
  type: 'INTERCHANGE-US',
  info: {
    nickname: 'My Debit Card',
    card_number:
      'Zoo8g2vBUjt7TwmEpRW8f6eQT3AOEEYePw2LkoxD+mO9lOT5OemHlGwgamgLGUbrmWu3DPwnEr2IqDy5YMFVgvQWP3w9nLOFzFFSW43auDgsVAqZScoRf8nI+6/B9KvOEV4XI8JeyXT+O+y3p3RtbiXGmYQNJ56Hy3hs2E5O+yn+3fpLfJQpVvNc38V+aE21VEsJuXFFNtS/8r4jJ6Dx/etTEaE/rtcEUEbwLLHFHjPiOWaHWZPuhXFLtyYrR9zG8FWSJVFwNTG/mEpv2O7We1iCB+9WoEKqdHyGwjjBcVgkUlU5huJIXv9xj53RGNvmHkDFTqgrlHpKkb0E/Ot0Zg==',
    exp_date:
      'ctA4Zj1CP0WCiMefPYsyewVbIHNilfwA09X9NSCyWxft4WGwFZmZkhsBJh51QL751/iFkUHbd09ZpDYjS86PqyNPZ5LkBueGHDIghLwWyzH1l99RiIs8urOW9c4g3L1USD+kzzRAqG1DBkW47FAX6AhPSi3YgQd94ery1H+asaqDrP79ayzoJ+nRXeEqe83FIgNUk/J5+EcAz3JYnoBmp1sfz7a4zHkvk0eKCxQWLETdqvONyCZyXdC/4CkaCxJ/87VsN3i4+ToULtSluRv8xr1NpRhzipKiEKTYW1nvNDAaJQezTVP/+GxmTmQfnfpVNDpJbXjNrOTej1HgMFpg4w==',
    document_id: '2a4a5957a3a62aaac1a0dd0edcae96ea2cdee688ec6337b20745eed8869e3ac8',
  },
};

module.exports.CHECK_US = {
  type: 'CHECK-US',
  info: {
    nickname: 'My Checking',
    payee_name: 'Some Name',
    payee_address: {
      address_street: '1 Market St',
      address_city: 'San Francisco',
      address_subdivision: 'CA',
      address_country_code: 'US',
      address_postal_code: '94105',
    },
  },
};

module.exports.CRYPTO_US = {
  type: 'CRYPTO-US',
  info: {
    nickname: 'My CRYPTO Wallet',
  },
};

module.exports.WIRE_US = {
  type: 'WIRE-US',
  info: {
    nickname: 'Some Account',
    account_num: '1235674342',
    routing_num: '026009593',
  },
};

module.exports.WIRE_INT = {
  type: 'WIRE-INT',
  info: {
    nickname: 'Some Account',
    account_num: '123567443',
    swift: 'TSIGFR22',
  },
};

module.exports.IOU = {
  type: 'WIRE-INT',
  info: {
    nickname: 'Some Account',
    account_num: '123567443',
    swift: 'TSIGFR22',
  },
};
