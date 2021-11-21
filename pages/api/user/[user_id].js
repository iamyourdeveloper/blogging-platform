import nc from 'next-connect';
import { onError, onNoMatch } from '@/utils/ncOptions';
import { verifAuth, authRole } from '@/utils/verifAuth';
import db from '@/utils/database';
import User from '@/models/User';
import Profile from '@/models/Profile';

const handler = nc({onError, onNoMatch});

// get user profile
// *** insomnia tested - passed
handler.use(verifAuth).get(async (req, res) => {
  const { user_id } = req.query;
  console.log("user_id")
  console.log(user_id)
  await db.connectToDB();
  const user = await User.findById(user_id).select('username email avatarImage');

  if (!user) {
    return res.status(401).json({ errors: [{ msg: "User unauthenticated."}] });
  }

  const profile = await Profile.findOne({user: user_id}).select("bio location backgroundImage social");
  await db.disconnect();

  res.status(200).json({
    status: "User information found.",
    data: {
      user, profile
    }
  })
});
export default handler;