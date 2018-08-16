const getHeader_X_SP_GAGEWAY = ({ client_id, client_secret }) => {
  if (client_id && client_secret) return `${client_id}|${client_secret}`;
  if (client_id && !client_secret) return client_id;
  if (!client_id && client_secret) return `|${client_secret}getHeader_X_SP_USER_IP`;
};

const getHeader_X_SP_USER_IP = ({ ip_address }) => {
  return ip_address;
};

const getHeader_X_SP_USER = ({ oauth_key, fingerprint }) => {
  if (oauth_key && fingerprint) return `${oauth_key}|${fingerprint}`;
  if (oauth_key && !fingerprint) return oauth_key;
  if (!oauth_key && fingerprint) return `|${fingerprint}`;
};

module.exports.buildHeaders = ({
  client_id,
  client_secret,
  ip_address,
  oauth_key,
  fingerprint,
}) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'X-SP-GATEWAY': 'xxxx|xxxx',
    },
  };

  if (client_id || client_secret) {
    config.headers['X-SP-GATEWAY'] = getHeader_X_SP_GAGEWAY({ client_id, client_secret });
  }

  if (ip_address) {
    config.headers['X-SP-USER-IP'] = getHeader_X_SP_USER_IP({ ip_address });
  }

  if (oauth_key || fingerprint) {
    config.headers['X-SP-USER'] = getHeader_X_SP_USER({ oauth_key, fingerprint });
  }

  return config;
};
