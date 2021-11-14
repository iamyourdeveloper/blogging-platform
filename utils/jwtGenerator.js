// require('dotenv').config();
// const jwt = require('jsonwebtoken');
import jwt from 'jsonwebtoken';
import { hash, compare } from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET;
const NODE_ENV = process.env.NODE_ENV;

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

async function getAccessTokenFromHeaders(headers) {
  const token = headers['Authorization'];
  return token ? token.split(' ')[1] : null;
}

async function verifyPassword(password, hashedPassword) {
  const isValid = await compare(password, hashedPassword);
  return isValid;
}

module.exports = { accessTokenGenerator, getAccessTokenFromHeaders, verifyPassword };