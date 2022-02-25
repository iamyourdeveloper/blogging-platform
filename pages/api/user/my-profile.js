import nc from 'next-connect';
import { onError, onNoMatch } from '@/utils/ncOptions';
import { verifAuth, authRole } from '@/utils/verifAuth';
import db from '@/utils/database';
import User from '@/models/User';
import Profile from '@/models/Profile';

const handler = nc({onError, onNoMatch});

// get user profile
// *** insomnia tested - passed
handler.use(verifAuth, authRole).get(async (req, res) => {
  const { id } = req.user;
  console.log("req.user");
  console.log(req.user);
  // const { user_id } = req.query;
  // console.log("user_id")
  // console.log(user_id)
  await db.connectToDB();
  // const user = await User.findById(user_id).select('username email avatarImage');
  const user = await User.findById(id).select('username email avatarImage');

  if (!user) {
    return res.status(401).json({ errors: [{ msg: "User unauthenticated."}] });
  }

  // const profile = await Profile.findOne({user: user_id}).select("bio location backgroundImage social");
  console.log("attempting to get user profile")
  // const profile = await Profile.findOne({user: id}).select("bio location backgroundImage social");
  let profile = await Profile.findOne({user: id});
  console.log("+++++ profile +++++")
  console.log(profile)
  console.log("+++++ profile +++++")
  if (profile) {
    if (profile.themes === [] || !profile.themes) profile.themes = "";
    if (profile.themes.length > 1 && Array.isArray(profile.themes)) {
      profile.themes = profile.themes.join(', ');
    }
  }

  if (!profile) profile = {};

  await db.disconnect();

  res.status(200).json({
    status: "User information found.",
    data: {
      // user,
      profile
    }
  })
});
export default handler;