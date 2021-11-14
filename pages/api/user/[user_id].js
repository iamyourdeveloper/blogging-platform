import nc from 'next-coonnect';
import { onError, onNoMatch } from '@/utils/ncOptions';
import db from '@/utils/database';
import User from '@/models/User';
import Profile from '@/models/Profile';

// *** get user profile
const handler = nc({onError, onNoMatch});

handler.get(async (req, res) => {
  const { user_id } = req.query;
  await db.connectToDB();
  const user = User.findById(user_id, 'username email avatarImage timestamps');

  if (!user) {
    return res.status(404).json({ errors: [{ msg: "User not found."}] });
  }

  const profile = await Profile.findById(user_id, "bio location backgroundImage social");

  res.status(200).json({
    status: "User information found.",
    data: {
      user, profile
    }
  })
  await db.diconnect();
});