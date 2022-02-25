require('dotenv').config();
import jwt from 'jsonwebtoken';
import { hash, compare } from 'bcryptjs';
import crypto from 'crypto';

let DOMAIN = process.env.DOMAIN
let DOMAIN_LOCAL = process.env.DOMAIN_LOCAL

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
      domain: NODE_ENV === 'production' ? DOMAIN : DOMAIN_LOCAL,
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