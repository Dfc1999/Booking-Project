/**
 * *This middleware protects routes by ensuring that requests contain a valid JWT token issued by Keycloak.
 */
import jwt from 'jsonwebtoken';
import { getKeycloakInstance } from '../../config/keycloakConfig.js';

export const authMiddleware = async (req, res, next) => {
  const token = req.headers?.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Token is required' });
  }

  const keycloak = getKeycloakInstance();

  try {
    const isValid = await keycloak.grantManager.validateAccessToken(token);
    if (!isValid) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    const decoded = jwt.decode(token);
    req.tokenInfo = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token validation failed', error: err });
  }
};
