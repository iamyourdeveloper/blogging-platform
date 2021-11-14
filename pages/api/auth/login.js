import nc from 'next-connect';
import bcrypt from 'bcryptjs';
import { onError, onNoMatch } from '@/utils/ncOptions';
import db from '@/utils/database';
import validate from '@/utils/validate';
import userLoginSchema from '@/utils/validateSchemas';

const handler = nc({onError, onNoMatch});

// login new user
// POST /api/auth/login
// are we using jwt
// handler.post(jwt?, (req, res) => {
// handler.use(validate(userLoginSchema)).post(async (req, res) => {
handler.post(async (req, res) => {
  const { email, password } = req.body;

  await db.connectToDB();
  let user = await User.findOne({ email });
  if (!user) {
    return res.status(403).json({ errors: [{ msg: "Invalid credentials." }] });
  }
  await db.disconnect();

  const verify = await bcrypt.compare(password, user.password);

  if (!verify) {
    return res.status(400).json({ errors: [{ msg: "Invalid credentials."}] });
  }

  // TODO - create JWT token, unless other verif method used
  // const jwtToken = accessTokenGenerator(user._id, user.role);

  return res.status(201).json({
    status: "User logged in!",
    data: {
      // token: jwtToken,
      user: {
        _id: user._id,
        // firstName: user.firstName,
        // lastName: user.lastName,
        username: user.username,
        email: user.email,
        avatarImage: user.avatarImage,
        role: user.role
      }
    }
  });
});

export default handler;