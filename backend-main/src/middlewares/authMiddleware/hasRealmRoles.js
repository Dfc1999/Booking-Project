/**
 * *This middleware verifies that the authenticated user has all the required roles.
 */
export const hasRealmRoles = (requiredRoles = []) => {
  return (req, res, next) => {
    const tokenInfo = req.tokenInfo;

    if (!tokenInfo) {
      return res.status(401).json({ message: 'Token info missing' });
    }

    const userRoles = tokenInfo.realm_access?.roles || [];

    const hasAllRoles = requiredRoles.every(role => userRoles.includes(role));

    if (!hasAllRoles) {
      return res.status(403).json({ message: 'Forbidden: insufficient roles' });
    }

    next();
  };
};
