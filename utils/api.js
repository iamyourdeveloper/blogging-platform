import Axios from 'axios';

const api = Axios.create({
  baseURL: 'http://localhost:3000/api',
  // baseURL: `${process.env.NEXTAUTH_URL}/api`,
  // baseURL: '/api',
  // headers: {
    // "Authorization": "Bearer "+localStorage.getItem("token"),
    // "Authorization": "Bearer "+localStorage.token && JSON.parse(localStorage.token)
    // 'X-Content-Type-Options': "nosniff",
    // 'Content-Type': 'application/json',
    // 'Content-Type': 'multipart/form-data'
  // },
  withCredentials: true,
  credentials: 'include',
});

api.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// api.interceptors.response.use(
//   res => res,
//   err => {
//     if (err.response.status === 401) {
//       store.dispatch({ type: LOGOUT });
//     }
//     return Promise.reject(err);
//   }
// );
export default api;

/* ROLE AUTHENTICATOR
const jwt = require('jsonwebtoken');
require('dotenv').config();
const pool = require ('../config/db');
// Get token from header, created by initial res.json, (when req sent to protected route) is required
// if access token is expired - refresh w/reftoken
// pass via header in the auth actions from redux...
// module.exports = async function(req, res, next) {
const authJWT = async (req, res, next) => {
  // varify header exists, get token from header
  const authHeader = String(req.header('Authorization'));
  let decoded;

  // Check if not token - if route is protected via this middleware
  if (authHeader && authHeader.startsWith('Bearer ')) {
    try {
      const token = authHeader.substring(7, authHeader.length);
      decoded = jwt.verify(token, process.env.JWT_SECRET);
      // decoded has user in payload (attatched user w/id in payload), if true grant user access, false logout
      req.user = decoded.user;
      next();
    } catch (err) {
      console.error(err.message);
      return res.status(401).send("Server Error! Token is not valid.");
    }    
  } else {
    res.status(401).json({ msg: 'No token. Authorization denied.'});
  }
};

const admin = async (req, res, next) => {
  const { role } = req.user; // passed via header
  // if (req.user && (role === 'admin' || role == 'staff')) {
  if (req.user && role === 'admin') {
    next()
  } else {
    res.status(401)
    throw new Error('Not authorized as an admin')
  }
}
module.exports = { authJWT, admin };
*/