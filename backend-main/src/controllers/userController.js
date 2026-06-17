import { registerUser, getUserInfo } from '../services/userService.js';

export const authRegister = async (req, res) => {
  const { username, email, password, firstName, lastName } = req.body; 

  try {
    const result = await registerUser({ username, email, password, firstName, lastName }); 
    if (result === 201) {
      return res.status(201).json({ message: 'User created successfully' });
    } else {
      return res.status(500).json({ message: 'Unexpected status from Keycloak' });
    }
  } catch (error) {
    console.error('Register error:', error?.response?.data || error.message);
    return res.status(400).json({
      message: 'Registration failed',
      details: error?.response?.data || error.message,
    });
  }
};

export const getMyUserInfoController = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authorization token is missing or malformed' });
    }
    const accessToken = authHeader.split(' ')[1];

    const user = await getUserInfo(accessToken);

    res.status(200).json({
      message: 'Authenticated user retrieved successfully',
      user, 
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving user information',
      error: error.message,
    });
  }
};