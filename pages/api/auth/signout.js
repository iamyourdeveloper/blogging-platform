// import nc from "next-connect";
// import cookie from 'cookie';
// import { onError, onNoMatch } from '@/utils/ncOptions';
// // import {verifAuth, authRole} from '@/utils/verifAuth';

// // *** Insomnia tested - passed
// const handler = nc({onError, onNoMatch});
// // *** Insomnia tested - passed
// handler.post(async (req, res) => {
//   const { token } = req.cookies;
//   console.log("token");
//   console.log(token);
//   if (!token) {
//     return res.status(403).json({ errors: [{ msg: "Unauthorized. Nothing found!" }] });
//   }
//   res.setHeader(
//     "Set-Cookie",
//     cookie.serialize("token", '', { expires: new Date(1), path: '/' })
//   );
//   // res.cookie('token', '', { expires: new Date(1) });
//   res.send({ success: "Logged out successfully!" });
// });
// export default handler;