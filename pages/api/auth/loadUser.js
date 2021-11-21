import nc from 'next-connect';
import { onError, onNoMatch } from '@/utils/ncOptions';
import { verifAuth, authRole } from '@/utils/verifAuth';
import db from '@/utils/database';
import User from '@/models/User';

const handler = nc({onError, onNoMatch});

// handler.use(verifAuth, authRole);
// *** Insomnia Tested - passed
handler.use(verifAuth, authRole).get(async (req, res) => {
  console.log("passed auth and role");
  console.log(req.user);
  let { id } = req.user;
  await db.connectToDB();
  const user = await User.findById({_id: id});
  await db.disconnect();

  console.log(user)
  if (!user) {
    return res.status(403).json({ errors: [{ msg: "No user found." }] });
  };
  
  res.status(200).json({
    status: "User found.",
    data: {
      user: {
        _id: user._id,
        firstname: user.firstName,
        lastname: user.lastName,
        username: user.lastName,
        email: user.email,
        avatar: user.avatarImage,
        role: user.role
      }
    }
  })
});
export default handler;