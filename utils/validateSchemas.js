// // import { array, number, object, string, TypeOf } from 'yup';
// import * as yup from 'yup';
// // export const userRegisterSchema = object().shape({
// exports.userRegisterSchema = yup.object({
//   firstName: yup.string(),
//   lastName: yup.string(),
//   username: yup.string().required(),
//   email: yup.string().email().required(),
//   password: yup.string().min(6).max(26).required(),
// });

// exports.userLoginSchema = yup.object({
//   // username: yup.string().required(),
//   email: yup.string().email().required(),
//   password: yup.string().min(6).max(26).required(),
// });

// exports.postSchema = yup.object({
//   coverImage: yup.string(),
//   coverImageFilename: yup.string(),
//   title: yup.string().required(),
//   text: yup.string().required(),
//   category: yup.string(),
//   tags: yup.lazy(val => (Array.isArray(val) ? yup.array().of(yup.string()) : yup.string())),
//   themes: yup.lazy(val => (Array.isArray(val) ? yup.array().of(yup.string()) : yup.string()))
// });

// exports.profileSchema = yup.object({
//   bio: yup.string(),
//   location: yup.string()
// });

// // exports.yupValidator = (schema, handler) => {
// //   return async (req, res, next) => {
// exports.yupValidator = async (req, res, next) => {
    
//     // console.log(req)
//     console.log("888888888888888");
//     let schema = req.body;

//     console.log(schema);
//     // return async (req, res, next) => {
//     // const body = req.body;
//     try {
//       req.body = await schema.validate(req.body, { abortEarly: false, stripUnknown: true})
//       // const isValid = await schema.validate(body, { abortEarly: false, stripUnknown: true})
//       // .catch((err) => { return err });]
//       // if (isValid) {
//       // if (req.body) {
//         // return next();
//       // }
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send(`Sever Error. ${err.message}`);
//     }
//     await handler(req, res)
//   // }
// };


// // export const personSchema = object({
// //   name: string().required().min(2),
// //   age: number().required().integer().min(18),
// //   email: string().optional().email(),
// //   personalWebsite: string().optional().url(),
// //   nationalities: array(
// //     object({
// //       country: string().required().oneOf(['PT', 'UK']),
// //       observation: string().optional().max(5000),
// //     })
// //   ).required().min(1),
// // });

// // export type Person = TypeOf<typeof personSchema>;