// /pages/api/userExists.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import {dbConnect} from '../../../utils/dbConnect';
import User from '../../../models/User';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    await dbConnect();
    const { email } = req.body;

    try {
      const existingUser = await User.findOne({ email });
      return res.status(200).json({ user: !!existingUser });
    } catch (error) {
      console.error('Error checking user existence:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
}
