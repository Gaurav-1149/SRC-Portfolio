import { Request, Response } from 'express';

export const handleAdminLogin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;

    const expectedUsername = process.env.ADMIN_USERNAME || 'SRCAdmin';
    const expectedPassword = process.env.ADMIN_PASSWORD || 'whothehellisthis';

    if (!username || !password) {
      res.status(400).json({
        success: false,
        message: 'Username and password are required.',
      });
      return;
    }

    if (username.trim() === expectedUsername && password.trim() === expectedPassword) {
      // Create session payload
      const token = Buffer.from(`${expectedUsername}:${Date.now()}:${Math.random().toString(36).substring(2)}`).toString('base64');

      res.status(200).json({
        success: true,
        message: 'Admin authentication successful.',
        token,
        user: {
          username: expectedUsername,
          role: 'Administrator',
        },
      });
      return;
    }

    res.status(401).json({
      success: false,
      message: 'Invalid administrative username or password.',
    });
  } catch (error) {
    console.error('Admin authentication error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error during authentication.',
    });
  }
};

export const handleVerifyAdminSession = async (req: Request, res: Response): Promise<void> => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ success: false, message: 'Unauthorized session.' });
    return;
  }

  const expectedUsername = process.env.ADMIN_USERNAME || 'SRCAdmin';
  res.status(200).json({
    success: true,
    user: {
      username: expectedUsername,
      role: 'Administrator',
    },
  });
};
