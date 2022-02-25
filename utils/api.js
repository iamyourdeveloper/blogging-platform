import Axios from 'axios';
// import Cookies from 'js-cookie';

const api = Axios.create({
  baseURL: 'http://localhost:3000/api',
  // baseURL: `${process.env.NEXTAUTH_URL}/api`,
  // baseURL: '/api',
  // headers: {
  //   "Authorization": "Bearer " + Cookies.get("blog__token")
  // },
  // headers: {
    // 'X-Content-Type-Options': "nosniff",
    // 'Content-Type': 'application/json',
    // 'Content-Type': 'multipart/form-data'
  // },
  withCredentials: true,
  credentials: 'include',
});

// api.interceptors.request.use(
//   function (config) {
//     const token = localStorage.getItem("token");
//     // const token = Cookies.get("blog__token");
//     const token = Cookies.get("blog__token") ? JSON.parse(Cookies.get("blog__token")) : "";
//     if (token) {
//       config.headers["Authorization"] = "Bearer " + token;
//       // config.headers["Authorization"] = token;
//     }
//     return config;
//   },
//   function (error) {
//     return Promise.reject(error);
//   }
// );

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