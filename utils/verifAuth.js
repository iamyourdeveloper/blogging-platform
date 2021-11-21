import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET;

const verifAuth = async (req, res, next) => {
  const { token } = req.cookies;
  console.log("verifying user authentication");
  console.log("token");
  console.log(token);
  if (!token) {
    return res.status(401).json({ errors: [{ msg: "No token. Authorization denied" }] });
  };

  try {
    console.log("decoded")
    // const decoded = jwt.verify(token, JWT_SECRET, (err, decoded) => {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ errors: [{ msg: "User unauthenticated."}] });
      } else {
        console.log(decoded)
        req.user = decoded.user;
        next();
      };
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send(`Sever Error. ${err.message}`);
    // res.json(`Server Error. ${err.message}`);
  }
};

const authRole = (req, res, next) => {
  const { role } = req.user;
  console.log("validating user role")
  console.log(role);
  // if (req.user && role === 'admin') {
  if (req.user && role === 'user') {
    next();
  } else {
    return res.status(401).json({ errors: [{ msg: "Authorization denied" }] });
  };
};

module.exports = {verifAuth, authRole};