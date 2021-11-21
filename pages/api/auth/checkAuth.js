import nc from 'next-connect';
import { onError, onNoMatch } from '@/utils/ncOptions';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;
// TODO: this is the api point used to validate JWT cookie to access protected routes client side. It is not tested.
const handler = nc({onError, onNoMatch});
handler.get(async (req, res) => {
  let { token } = req.cookie;
  if (!token) {
    return res.status(401).json({ errors: [{ msg: "User unauthenticated."}] });
  };
  try {
    jwt.verify(token, JWT_SECRET, (err, isValid) => {
      if (err) {
        return res.status(401).json({ errors: [{ msg: "User unauthenticated."}] });
      } else {
        return isValid;
      };
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send(`Sever Error. ${err.message}`);
  }
});
export default handler;