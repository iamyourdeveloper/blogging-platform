import nc from 'next-connect';
import multer from 'multer';
import normalize from 'normalize-url';
import cookie from 'cookie';
import { v2 as cloudinary } from 'cloudinary';
import { onError, onNoMatch } from '@/utils/ncOptions';
import { verifAuth, authRole } from '@/utils/verifAuth';
import { storage, removeOnErr } from '@/utils/cloudinary';
import db from '@/utils/database';
import User from '@/models/User';
import Post from '@/models/Post';
import Profile from '@/models/Profile';

export const config = {
  api: {
    bodyParser: false,
  },
};

const upload = multer({
  storage,
  limits: { fieldSize: 3 * 1024 * 1024 },
  fileFilter(req,file, cb) {
    if (!file.originalname.match(/\.(gif|jpe?g|png)$/i)) {
      return cb(new Error("file must be an image"));
    }
    return cb(null, true);
  }
}); //3MB

// *** create user profile, update, & delete account
const handler = nc({onError, onNoMatch});
handler.use(verifAuth, authRole);

// TODO: use to prefill form when making profile edit. Perhaps modify to user with admin role to access (not user role).
// retrieve user profile
// *** insomnia tested - passed
// handler.get(async (req, res) => {
//   const { user_id } = req.query;
//   await db.connectToDB();
//   const profile = await Profile.findOne({user: user_id});

//   if (Array.isArray(profile.themes)) {
//     profile.themes = profile.themes.join(', ');
//   }
//   await db.disconnect();

//   res.status(201).json({
//     status: "Profile found.",
//     data: {
//       profile
//     }
//   })
// });

// // create user profile
// // *** insomnia tested - passed
// handler.use(upload.single('image_url')).post(async(req, res) => {
//   const { user_id } = req.query;
//   let { bio, location, themes, website, youtube, twitter, linkedin, instagram, reddit, github } = req.body;
//   let imageUrl = '';
//   let imageFilename = '';
//   let themesToArr;

//   await db.connectToDB();
//   const user = await User.findById(user_id).select("-password");

//   console.log("user")
//   console.log(user)
//   const profileExists = await Profile.findOne({user: user_id}).select("_id");

//   console.log("profileExists")
//   console.log(profileExists)

//   if (!user) {
//     if (req.file) {
//       await removeOnErr(req.file.filename);
//     }
//     return res.status(403).json({ errors: [{ msg: "User not found. Sign in."}] });
//   };
  
//   if (profileExists) {
//     if (req.file) {
//       await removeOnErr(req.file.filename);
//     }
//     return res.status(403).json({ errors: [{ msg: "User profile already exists."}] });
//   }

//   if (req.file && req.file.path) {
//     imageUrl = req.file.path;
//     imageFilename = req.file.filename;
//   }
//   if (imageUrl.startsWith('public\\')) {
//     let editImgUrl = imageUrl.slice(6);
//     imageUrl = editImgUrl;
//   }

//   if (typeof themes === "string") {
//     themesToArr = themes.split(',').map(theme => '' + theme.trim());
//   };

//   console.log("themes to array")
//   console.log(themesToArr)
  
//   // ensure only two or less themes exist:
//   let savedThemes = [];
//   if (themesToArr.length > 2) {
//     for (let i = 0; i < 2; i++) {
//       let theme = themesToArr[i];
//       savedThemes.push(theme);
//     };
//   } else {
//     savedThemes = themesToArr;
//   };

//   console.log("themes saved")
//   console.log(savedThemes)
  
//   const socialFields = {
//     website, youtube, twitter, linkedin, instagram, reddit, github
//   }

//   // *** normalize urls
//   for (const [key, value] of Object.entries(socialFields)) {
//     if (value && value.length > 0)
//       socialFields[key] = normalize(value, { forceHttps: true });
//   }

//   const newProfile = await new Profile({
//     user: user_id,
//     bio,
//     location,
//     themes: savedThemes,
//     backgroundImage: imageUrl,
//     backgroundImageFilename: imageFilename,
//     social: socialFields
//   });

//   const profile = await newProfile.save();
//   await db.disconnect();

//   res.status(201).json({
//     status: "Profile created.",
//     data: {
//       profile
//     }
//   })
// });

// *** insomnia tested - passed
// *** delete profile, posts + all user data
handler.delete(async(req, res) => {
  const { user_id } = req.query;
  await db.connectToDB();

  console.log(user_id)

  const user = await User.findById({_id: user_id});
  console.log("user")
  console.log(user)

  // todo: turn into findone
  const profile = await Profile.findOne({user: user_id});
  console.log("profile")
  console.log(profile)

  if (user.avatarImageFilename) {
    await cloudinary.uploader.destroy(user.avatarImageFilename);
  }

  if (profile.backgroundImageFilename) {
    await cloudinary.uploader.destroy(profile.backgroundImageFilename);
  }

  console.log("post find testing")
  // only return specified field, exclude _id which is usually included by default
  let postImages = await Post.find({user: user_id}).select('coverImageFilename -_id');
  console.log("post test 02")
  console.log(postImages)

  if (postImages.length > 0) {
    let promises = [];
    for (let i = 0; i < postImages.length; i++) {
      if (postImages[i].coverImageFilename !== '') {
        promises.push(cloudinary.uploader.destroy(postImages[i].coverImageFilename));
      }
    }
    await Promise.all(promises);
  };

  // delete remaining user data
  await Promise.all([
    Post.deleteMany({ user: user_id }),
    Profile.findOneAndRemove({ user: user_id }),
    User.findOneAndRemove({ _id: user_id })
  ]);
  await db.disconnect();

  const { token } = req.cookies;
  if (!token) {
    return res.status(403).json({ errors: [{ msg: "Unauthorized. Nothing found!" }] });
  }
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("token", '', { expires: new Date(1), path: '/' })
  );

  res.status(200).json({
    status: "All user profile and data deleted."
  });
});
export default handler;