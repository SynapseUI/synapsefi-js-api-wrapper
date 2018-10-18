const { expect } = require('chai');

const buildHeaders = require('../../src/helpers/buildHeaders');

describe('buildHeaders', () => {
  it('build header with full args ', () => {
    const outputHeaders = buildHeaders({
      client_id: 'CLIENT_ID',
      client_secret: 'CLIENT_SECRET',
      oauth_key: 'OAUTH_KEY',
      fingerprint: 'FINGERPRINT',
      ip_address: 'IP_ADDRESS',
    });

    const targetHeaders = {
      'Content-Type': 'application/json',
      'X-SP-USER-IP': 'IP_ADDRESS',
      'X-SP-GATEWAY': 'CLIENT_ID|CLIENT_SECRET',
      'X-SP-USER': 'OAUTH_KEY|FINGERPRINT',
    };

    expect(outputHeaders).to.deep.equal(targetHeaders);
  });

  it('build header with no ip_address ', () => {
    const outputHeaders = buildHeaders({
      client_id: 'CLIENT_ID',
      client_secret: 'CLIENT_SECRET',
      oauth_key: 'OAUTH_KEY',
      fingerprint: 'FINGERPRINT',
    });

    const targetHeaders = {
      'Content-Type': 'application/json',
      'X-SP-USER-IP': '127.0.0.1',
      'X-SP-GATEWAY': 'CLIENT_ID|CLIENT_SECRET',
      'X-SP-USER': 'OAUTH_KEY|FINGERPRINT',
    };

    expect(outputHeaders).to.deep.equal(targetHeaders);
  });

  it('build header with no oauth_key ', () => {
    const outputHeaders = buildHeaders({
      client_id: 'CLIENT_ID',
      client_secret: 'CLIENT_SECRET',
      fingerprint: 'FINGERPRINT',
    });

    const targetHeaders = {
      'Content-Type': 'application/json',
      'X-SP-USER-IP': '127.0.0.1',
      'X-SP-GATEWAY': 'CLIENT_ID|CLIENT_SECRET',
      'X-SP-USER': '|FINGERPRINT',
    };

    expect(outputHeaders).to.deep.equal(targetHeaders);
  });
});
