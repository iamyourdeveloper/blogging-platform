import jwt from 'jsonwebtoken';
import { hash, compare } from 'bcryptjs';
import crypto from 'crypto';

const JWT_SECRET = process.env.JWT_SECRET;
const NODE_ENV = process.env.NODE_ENV;

// for now leave off async await, causes ref cookie to read as undiefined....
function validateAccessTokenCookie(token) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    // becuz payload stored value in a obj
    // return decoded.tokenId;
    return decoded;
  } catch (err) {
    console.error('something went wrong with validating the refresh token!');
    return null;
  }
}

function accessTokenCookieOptions() {
  return {
      // maxAge: 300 * 1000,
      // expires: new Date(Date.now() + 1*60*60*1000), // 1hr
      // expires: new Date(Date.now() + 300*1000), // 120sec
      // path: "/",
      expires: new Date(Date.now() + 7*24*60*60*1000), //7d
      secure: NODE_ENV === 'production' ? true : false,
      httpOnly: NODE_ENV === 'production' ? true : false,
      sameSite: 'strict',
      // "/" access whole app
      path: '/'
  }
};

function accessTokenGenerator (user_id, role) {
  // role = admin (access admin only routes)
  const payload = {
    user: {
      id: user_id,
      role: role
    }
  }
  return jwt.sign(
    // payload, JWT_SECRET, { expiresIn: '1800s' }, //30m
    // payload, JWT_SECRET, { expiresIn: '180s' },
    payload, JWT_SECRET, { expiresIn: "7d" }
  );
};

// check for access token in backend, may not need
async function getAccessTokenHeaders(headers) {
  const token = headers['Authorization'];
  return token ? token.split(' ')[1] : null;
};

async function verifyPassword(password, hashedPassword) {
  const isValid = await compare(password, hashedPassword);
  return isValid;
};

module.exports = { accessTokenGenerator, getAccessTokenHeaders, validateAccessTokenCookie, accessTokenCookieOptions, verifyPassword };

// exports.refreshToken = () => {
  // call to axios.post('users/refresh-token');
  // find usser credentials in db, bu user id, generate refresh token for that user, update db (place token into it) then call to:
  // startRefreshTokenTimer();
  // return;
// }


/*
// helper functions
let refreshTokenTimeout;
function startRefreshTokenTimer() {
  // parse json object from base64 encoded jwt token
  const jwtToken = JSON.parse(atob(userSubject.value.jwtToken.split('.')[1]));
  // set a timeout to refresh the token a minute before it expires
  const expires = new Date(jwtToken.exp * 1000);
  const timeout = expires.getTime() - Date.now() - (60 * 1000);
  refreshTokenTimeout = setTimeout(refreshToken, timeout);
}
function stopRefreshTokenTimer() {
  clearTimeout(refreshTokenTimeout);
}
return jwt.sign(
  payload, JWT_REFRESH_SECRET, { expiresIn: '7 days' },
  (err, token) => {
    if (err) throw err;
    // reject(createError.InternalServerError());
  }
);
*/