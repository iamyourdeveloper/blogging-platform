/*
import nc from "next-connect";

import dbConnect from "lib/dbConnect";
import { parseCookies } from "utils/helpers";

const handler = nc();

handler.use(dbConnect).post((req, res) => {
  try {
    const { refreshToken } = parseCookies(req);

    if (!refreshToken) {
      throw new Error("An error occurred, you are already signed out.");
    }

    res.setHeader(
      "Set-Cookie",
      `refreshToken=""; HttpOnly; Expires=${new Date(0)}`
    );
    res.status(204).json();
  } catch (error) {
    res.status(400).json({
      status: "failure",
      message: error.message,
    });
  }
});

export default handler;

*/
/*
exports.authTest = async (req, res, next) => {
  let { id, stripeCustId } = req.user; // passed via header
  try {
    const user = await pool.query(
      'SELECT * FROM users WHERE id = $1;', [id]
    );
    if (user.rowCount === 0 || !user.rows[0]) {
      return res.status(403).json({ errors: [{ msg: "Unauthorized. Failed to get user data." }] });
    }
    // do not send the password to the client
    user.rows[0].user_password = undefined;
    let userRows = user.rows[0];
    if (!stripeCustId) stripeCustId = "";
    userRows.stripeCustId = stripeCustId;

    return res.status(200).json({
      success: "Test successful!",
      data: {3
        // userInfo: user.rows[0]
        userInfo: userRows
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error!');
  }
};

exports.authLogout = async (req, res, next) => {
  const { refresh } = req.cookies;
  // remove access token from localstorage:
  // console.log("attempting logout of user")
  // if (!refresh) return "logout: no refresh cookie exists!"; 
  // verify token to get payload...
  // try {
  //   res.send("you have a cookie!")
  // } catch (err) {
  //   res.send("no cookie");
  // }
  const verifiedRefToken = validateRefreshToken(refresh);

  // if (verifiedRefToken === null) {
  //   res.status(403).send('Failed to verify refresh token.');
  //   return; // maybe redirect / call logout (handles bu authJWT middleware)
  // }
  // console.log("logging out:");
  // console.log(verifiedRefToken);
  // console.log("==============");
  // console.log(verifiedRefToken.refreshTokenId);
  // console.log(verifiedRefToken.refreshToken);

  try {
    // console.log("refresh token cookie has been verified!");
    // res.send("you have a cookie!")
    // clear existing cookies:
    if (verifiedRefToken) {
      const clearRefreshToken = await pool.query(
        'UPDATE users SET refresh_token = null WHERE refresh_token = $1 RETURNING *', [verifiedRefToken.refreshToken]
      );
      // if (clearRefreshToken.rows[0].refresh_token !== null) {
      //   return res.status(403).json({ errors: [{ msg: "Unauthorized. Failed to nullify refresh token." }] });
      // }
        
      // console.log(clearRefreshToken.rows[0].refresh_token);
      // res.send("successfully nulled refresh token");
      // res.clearCookie('refresh'); // instead of deleting, override
      res.cookie('refresh', '', { expires: new Date(1) });
      // to effectively "delete" a cookie, one must set the expiration to essentially be maxAge=1
    };
    
    res.send({ "success": "Logged out successfully!" });
    // implement login redirects later
    // return res.status(200).redirect("/login");
  } catch (err) {
    // res.send("no cookie?????");
    console.error(err.message);
    res.status(500).send("Failed while attempting logout!");
  }
};
*/