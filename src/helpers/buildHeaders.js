const getHeader_X_SP_GAGEWAY = ({ client_id, client_secret }) => {
  if (client_id && client_secret) return `${client_id}|${client_secret}`;
  if (client_id && !client_secret) return client_id;
  if (!client_id && client_secret) return `|${client_secret}getHeader_X_SP_USER_IP`;
  return 'xxxx|xxxx';
};

const getHeader_X_SP_USER = ({ oauth_key, fingerprint }) => {
  if (oauth_key && fingerprint) return `${oauth_key}|${fingerprint}`;
  if (oauth_key && !fingerprint) return oauth_key;
  if (!oauth_key && fingerprint) return `|${fingerprint}`;
  return 'xxxx|xxxx';
};

module.exports = ({ client_id, client_secret, oauth_key, fingerprint, ip_address }) => {
  const headers = {
    'Content-Type': 'application/json',
    'X-SP-USER-IP': ip_address || '127.0.0.1',
  };

  if (client_id || client_secret) {
    headers['X-SP-GATEWAY'] = getHeader_X_SP_GAGEWAY({ client_id, client_secret });
  }

  if (oauth_key || fingerprint) {
    headers['X-SP-USER'] = getHeader_X_SP_USER({ oauth_key, fingerprint });
  }

  return headers;
};
