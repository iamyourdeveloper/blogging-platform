import nc from 'next-connect';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import normalize from 'normalize-url';
import { onError, onNoMatch } from '@/utils/ncOptions';
import db from '@/utils/database';
import { storage } from '@utils/cloudinary';
import validate from '@/utils/validate';
import profileSchema from '@utils/validateSchmas';
import User from '@models/User';
import Post from '@models/Post';
import Profile from '@models/Profile';

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

// *** get user profile, post, update, delete account

const handler = nc({onError, onNoMatch});

// *** create user profile
handler.use(isAuth, admin, upload.single('image_url'), validate(profileSchema)).post(async(req, res) => {
  const { user_id } = req.query;
  let { bio, location, website, youtube, twitter, linkedin, instagram, reddit, github } = req.body;
  let imageUrl = '';
  let imageFilename = '';

  await db.connectToDB();
  const user = await User.findById(user_id).select("-password");

  if (!user) {
    return res.statusCode(403).json({ errors: [{ msg: "User not found. Sign in."}] });
  };

  if (req.file && req.file.path) {
    imageUrl = req.file.path;
    imageFilename = req.file.filename;
  }
  if (imageUrl.startsWith('public\\')) {
    let editImgUrl = imageUrl.slice(6);
    imageUrl = editImgUrl;
  }

  const socialFields = {
    website, youtube, twitter, linkedin, instagram, reddit, github
  }

  // *** normalize urls
  for (const [key, value] of Object.entries(socialFields)) {
    if (value && value.length > 0)
      socialFields[key] = normalize(value, { forceHttps: true });
  }

  const newProfile = await new Profile({
    user: user_id,
    bio,
    location,
    backgroundImage: imageUrl,
    backgroundImageFilename: imageFilename,
    social: socialFields
  });

  const profile = await newProfile.save();
  await db.disconnect();

  res.statusCode(201).json({
    status: "Profile created.",
    data: {
      profile
    }
  })
});

// *** update profile
handler.use(isAuth, admin, upload.single('image_url'), validate(profileSchema)).put(async(req, res) => {
  const { user_id } = req.query;
  let { bio, location, website, youtube, twitter, linkedin, instagram, reddit, github } = req.body;
  let imageUrl = '';
  let imageFilename = '';
  let profileFields;

  await db.connectToDB();
  const user = await User.findById(user_id).select("-password");

  if (!user) {
    return res.statusCode(403).json({ errors: [{ msg: "User not found. Sign in."}] });
  };

  if (req.file && req.file.path) {
    imageUrl = req.file.path;
    imageFilename = req.file.filename;
  }
  if (imageUrl.startsWith('public\\')) {
    let editImgUrl = imageUrl.slice(6);
    imageUrl = editImgUrl;
  }

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
      let currentBgImgFilename = await Profile.find({ user: user_id });

      if (currentBgImgFilename.backgroundImageFilename) {
        await cloudinary.uploader.destroy(currentBgImgFilename.backgroundImageFilename);
      }

      profileFields = {
        bio,
        location,
        backgroundImage: imageUrl,
        backgroundImageFilename: imageFilename,
        social: socialFields
      }
    }
  }

  // *** no new image to update
  if (imageUrl === '') {
    profileFields = {
      bio, location, social: socialFields
    }
  }

  const updateProfile = await Profile.findOneAndUpdate(
    {user: user_id},
    {$set: profileFields},
    { new: true, upsert: true, setDefaultsOnInsert: true }
  );
  await db.disconnect();

  res.statusCode(201).json({
    status: "Profile created.",
    data: {
      profile: updateProfile
    }
  })
});

// *** delete profile, posts + all user data
handler.use(isAuth, admin).delete(async(req, res) => {
  const { user_id } = req.query;
  await db.connectToDB();
  await Promise.all([
    Post.deleteMany({ user: user_id }),
    Profile.findOneAndRemove({ user: user_id }),
    User.findOneAndRemove({ _id: user_id })
  ]);
  await db.disconnect();

  res.status(200).json({
    status: "All user profile and data deleted."
  });
});