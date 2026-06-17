import Keycloak from 'keycloak-connect';
import axios from 'axios';

export const getKeycloakInstance = () => {
  const keycloakConfig = {
    clientId: process.env.KEYCLOAK_CLIENT_ID,
    bearerOnly: true,
    serverUrl: process.env.KEYCLOAK_SERVER_URL,
    realm: process.env.KEYCLOAK_REALM,
    credentials: {
      secret: process.env.KEYCLOAK_CLIENT_SECRET,
    },
  };
  return new Keycloak({}, keycloakConfig);
};

export const getAdminToken = async () => {
  const response = await axios.post(
    `${process.env.KEYCLOAK_SERVER_URL}/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/token`,
    new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: process.env.KEYCLOAK_CLIENT_ID,
      client_secret: process.env.KEYCLOAK_CLIENT_SECRET,
    }),
    {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    }
  );

  return response.data.access_token;
};