import { loginUser, logoutUserService, getUserSessions, refreshAccessToken } from '../services/authService.js';

export const authLogin = async (req, res) => {
  const { username, user_password } = req.body;

  try {
    const result = await loginUser(username, user_password);

    res.cookie('refreshToken', result.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, 
      path: '/',
    });

    res.status(200).json({
      message: 'User Login Successful',
      status: true,
      ...result,
    });
  } catch (error) {
    res.status(401).json({
      message: 'Authentication failed',
      status: false,
      accessToken: null,
      refreshToken: null,
      userId: null,
    });
  }
};

export const logoutUserController = async (req, res) => {
  try {
    const refreshToken = req.cookies?.refreshToken;

    if (refreshToken) {
      await logoutUserService(refreshToken);
    }

    res.cookie('refreshToken', '', {
      maxAge: 0,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Lax',
      path: '/',
    });

    res.status(204).send();
  } catch (error) {
    console.error('Logout error:', error.message);
    res.cookie('refreshToken', '', { maxAge: 0, httpOnly: true, path: '/' });
    res.status(500).json({ message: 'Error logging out user', error: error.message });
  }
};

export const getUserSessionsController = async (req, res) => {
  try {
    const userId = req.tokenInfo?.sub;
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const sessions = await getUserSessions(userId);

    res.status(200).json({
      message: 'User sessions retrieved successfully',
      sessions,
    });
  } catch (error) {
    console.error('Error fetching sessions:', error.response?.data || error.message);
    res.status(500).json({ message: 'Error fetching user sessions', error: error.message });
  }
};

export const refreshTokenController = async (req, res) => {
  try {
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ message: 'Refresh token is missing' });
    }

    const newTokens = await refreshAccessToken(refreshToken);

    res.cookie('refreshToken', newTokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: '/',
    });

    return res.status(200).json({
      message: 'Token refreshed successfully',
      accessToken: newTokens.accessToken,
      expiresIn: newTokens.expiresIn,
    });
  } catch (error) {
    return res.status(401).json({ message: 'Invalid refresh token', error: error.message });
  }
};


