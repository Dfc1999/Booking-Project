import { getAdminToken } from "../config/keycloakConfig.js";
import axios from "axios";

const DEFAULT_REALM_ROLES = ['user'];

export const registerUser = async (userData) => {
  const adminToken = await getAdminToken();

  const payload = {
    username: userData.username,
    email: userData.email,
    firstName: userData.firstName,  
    lastName: userData.lastName,    
    enabled: true,
    emailVerified: false,
    credentials: [
      {
        type: 'password',
        value: userData.password,
        temporary: false,
      },
    ]
  };

  const response = await axios.post(
    `${process.env.KEYCLOAK_SERVER_URL}/admin/realms/${process.env.KEYCLOAK_REALM}/users`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${adminToken}`,
        'Content-Type': 'application/json',
      },
    }
  );

  return response.status; 
};

export const getUserInfo = async (accessToken) => {
  try {
    const realm = process.env.KEYCLOAK_REALM;
    const url = `${process.env.KEYCLOAK_SERVER_URL}/realms/${realm}/protocol/openid-connect/userinfo`;

    const response = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching user info from Keycloak:', error.response?.data || error.message);
    throw new Error('Failed to fetch user info from provider');
  }
};