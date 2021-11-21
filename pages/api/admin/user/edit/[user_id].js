import nc from 'next-connect';
import multer from 'multer';
import normalize from 'normalize-url';
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

// update profile
// *** insomnia tested - passed
handler.use(upload.single('image_url')).put(async(req, res) => {
  const { user_id } = req.query;
  console.log("updating profile")
  let { bio, location, themes, website, youtube, twitter, linkedin, instagram, reddit, github } = req.body;
  console.log("req.body")
  console.dir(bio)
  console.dir(location)
  console.dir(themes)
  console.dir(website)
  console.dir(reddit)
  console.dir(github)
  let imageUrl = '';
  let imageFilename = '';
  let profileFields;
  let themesToArr;

  await db.connectToDB();
  const user = await User.findById(user_id).select("-password");

  if (!user) {
    if (req.file) {
      await removeOnErr(req.file.filename);
    }
    return res.status(403).json({ errors: [{ msg: "User not found. Sign in."}] });
  };

  const profileExists = await Profile.findOne({user: user_id}).select("_id");

  console.log("profileExists")
  console.log(profileExists)
  
  if (!profileExists) {
    if (req.file) {
      await removeOnErr(req.file.filename);
    }
    return res.status(403).json({ errors: [{ msg: "User profile not found."}] });
  }

  if (req.file && req.file.path) {
    imageUrl = req.file.path;
    imageFilename = req.file.filename;
  }
  if (imageUrl.startsWith('public\\')) {
    let editImgUrl = imageUrl.slice(6);
    imageUrl = editImgUrl;
  }

  console.log("themes")
  console.log(themes)
  if (typeof themes === "string") {
    themesToArr = themes.split(',').map(theme=> '' + theme.trim());
  };

  console.log("themes to array")
  console.log(themesToArr)
  
  // ensure only two or less themes exist:
  let savedThemes = [];
  if (themesToArr.length > 2) {
    for (let i = 0; i < 2; i++) {
      let theme = themesToArr[i];
      savedThemes.push(theme);
    };
  } else {
    savedThemes = themesToArr;
  };

  console.log("themes saved")
  console.log(savedThemes)

  const socialFields = {
    website, youtube, twitter, linkedin, instagram, reddit, github
  }

  // *** normalize urls
  for (const [key, value] of Object.entries(socialFields)) {
    if (value && value.length > 0)
      socialFields[key] = normalize(value, { forceHttps: true });
  }

  if (imageUrl !== '') {
    if (imageFilename !== '') {
      let currentBgImgFilename = await Profile.findOne({ user: user_id });

      if (currentBgImgFilename.backgroundImageFilename) {
        await cloudinary.uploader.destroy(currentBgImgFilename.backgroundImageFilename);
      }

      profileFields = {
        bio,
        location,
        themes: savedThemes,
        backgroundImage: imageUrl,
        backgroundImageFilename: imageFilename,
        social: socialFields
      }
    }
  }

  // *** no new image to update
  if (imageUrl === '') {
    profileFields = {
      bio, location, themes: savedThemes, social: socialFields
    }
  }

  const updateProfile = await Profile.findOneAndUpdate(
    {user: user_id},
    {$set: profileFields},
    { new: true, upsert: true, setDefaultsOnInsert: true }
  );
  await db.disconnect();

  res.status(201).json({
    status: "Profile updated.",
    data: {
      profile: updateProfile
    }
  })
});
export default handler;