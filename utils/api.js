// require('dotenv').config();
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
  credentials: 'include',
});

// api.interceptors.request.use(
//   function (config) {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers["Authorization"] = "Bearer " + token;
//     }
//     return config;
//   },
//   function (error) {
//     return Promise.reject(error);
//   }
// );
// ##################################################
// ##################################################
/*
// takes token from auth action, if there, add it to Authorization headers, if not - delete header
import api from './api';

// When we have a token, it's sent with every request.
const setAuthToken = token => {
  // console.log("token")
  // console.log(token)
  // token value derived from localstorage
  if (token) {
    // set global header to value of token passed in:
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    // set token to LS
    localStorage.setItem('token', token);
  } else {
    // if token is expired (perhaps do a refresh, then continue with a second url request followed by setting the token into the header)
    // if no token, delete global header
    delete api.defaults.headers.common['Authorization'];
    localStorage.removeItem('token');
  }
}
// pass value back into (auth) actions
export default setAuthToken;
*/
// ##################################################
// ##################################################
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









/* AUTHENTICATOR
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