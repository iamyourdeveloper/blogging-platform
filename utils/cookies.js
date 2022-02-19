// import jwt from 'jsonwebtoken';
// const JWT_SECRET = process.env.JWT_SECRET;
// // TODO: consider deleting this file
// // TODO: not sure if safe, possible exposure to client of secret? I could not find sure ways of doing this so I kinda just hacked it together. Perhps best to create a verif route server side that checks validity of cookie
// // *** client-side verif of user role
// const verifRole = async (req, res, next) => {
//   const { token } = req.cookies;
//   try {
//     console.log("client verif of cookie");
//     console.log("token");
//     console.log(token);

//     let isValid = jwt.verify(token, JWT_SECRET);
//     console.log("client role:")
//     console.log(isValid)
//     if (isValid) {
//       let role = isValid.user.role;
//       return role;
//     }
//     return;
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send(`Sever Error. ${err.message}`);
//     res.json(`Server Error. ${err.message}`);
//   }
// };

// module.exports = {verifRole};

// // import { serialize } from 'cookie';
// // import cookie from "cookie";

// // export function parseCookies(req) {
// //   return cookie.parse(req ? req.headers.cookie || "" : document.cookie)
// // }

// //*** front end parse of cookie
// // lgout
// // export default (req, res) => {
// //   res.setHeader(
// //     "Set-Cookie",
// //     cookie.serialize("token", "", {
// //       httpOnly: true,
// //       secure: process.env.NODE_ENV !== "development",
// //       expires: new Date(0),
// //       sameSite: "strict",
// //       path: "/",
// //     })
// //   );
// //   res.status = 200;
// //   res.json({ success: true });
// // };