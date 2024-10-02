import User from '../../../models/User';
import connectToDatabase from '../../../utils/db';

export default async function handler(req, res) {
  const userId = req.session.userId; // Get from session or token
  
  await connectToDatabase();
  
  const user = await User.findById(userId);
  
  res.status(200).json(user);
}
