import nc from 'next-connect';
import bcrypt from 'bcryptjs';
import { onError, onNoMatch } from '@/utils/ncOptions';
import cookie from 'cookie';
import db from '@/utils/database';
import User from '@/models/User';
import { accessTokenGenerator, accessTokenCookieOptions } from '@/utils/jwtGenerator';

const handler = nc({onError, onNoMatch});

// login user
// POST /api/auth/login
// are we using jwt secret placed inside of a cookie
// *** Insomnia tested - passed
handler.post(async (req, res) => {
  const { email, password } = req.body;

  console.log(req.body)
  await db.connectToDB();
  console.log("user db")
  let user = await User.findOne({ email });
  // let user = await User.findOne({ email }).select('-password');
  console.log(user)
  // retursn user._id
  if (!user) {
    return res.status(403).json({ errors: [{ msg: "Invalid credentials." }] });
  }
  await db.disconnect();

  const verify = await bcrypt.compare(password, user.password);

  if (!verify) {
    return res.status(400).json({ errors: [{ msg: "Invalid credentials."}] });
  }

  const jwtAccessToken = accessTokenGenerator(user._id, user.role);
  const cookieOptions = accessTokenCookieOptions();

  if (user.password) {
    console.log(user.password)
    user.password = undefined;
    console.log("==============")
    console.log(user.password)
  }
  console.log("user - final check")
  console.log(user)

  res.setHeader(
    "Set-Cookie",
    cookie.serialize("token", jwtAccessToken, cookieOptions)
  );

  // res.cookie('token', jwtAccessToken, cookieOptions);
  return res.status(201).json({
    status: "User logged in!",
    data: {
      // token: jwtToken,
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
        avatarImage: user.avatarImage,
        role: user.role
      }
    }
  });
});
export default handler;