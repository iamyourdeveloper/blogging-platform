import nc from 'next-connect';
import bcrypt from 'bcryptjs';
import cookie from 'cookie';
import slug from 'slug';
import multer from 'multer';
import { onError, onNoMatch } from '@/utils/ncOptions';
import db from '@/utils/database';
import { storage, removeOnErr } from '@/utils/cloudinary';
// import yupValidator from '@/utils/validate';
// import { userRegisterSchema, yupValidator } from '@/utils/validateSchemas';
import { accessTokenGenerator, accessTokenCookieOptions } from '@/utils/jwtGenerator';
import User from '@/models/User';

// needed to decrypt req.body
export const config = {
  api: {
    bodyParser: true,
  },
};

const upload = multer({
  storage,
  limits: { fieldSize: 3 * 1024 * 1024 },
  // TODO --- filefilter seems to err; consider deletion
  // fileFilter(req, file, cb) {
  //   if (!file.originalname.match(/\.(gif|jpe?g|png)$/i)) {
  //     return cb(new Error("file must be an image"));
  //   }
  //   return cb(null, true);
  // }
}); //3MB

const handler = nc({onError, onNoMatch});


// *** Insomnia tested - passed
handler.use(upload.single('image_url')).post(async (req, res) => {
  // req.file produced by multer after uploading to cloudinary
  // path = secure_url / filename = public_id
  let { firstName, lastName, username, email, password, password2 } = req.body;
  console.log("****** req.body ******")
  console.log(req.body)
  console.log("req.body.image_url")
  console.log(req.body.image_url)
  // JSON.parse(req.body)
  console.log(firstName);
  console.log(lastName);
  console.log(username);
  console.log(email);
  console.log(password);

  if (firstName && typeof firstName !== 'string') {
    if (req.file) {
      await removeOnErr(req.file.filename);
    }
    return res.status(403).json({ errors: [{ msg: 'Invalid credentials.' }] });
  };
  if (lastName && typeof lastName !== 'string') {
    if (req.file) {
      await removeOnErr(req.file.filename);
    }
    return res.status(403).json({ errors: [{ msg: 'Invalid credentials.' }] });
  };
  if (username && typeof username !== 'string') {
    if (req.file) {
      await removeOnErr(req.file.filename);
    }
    return res.status(403).json({ errors: [{ msg: 'Invalid credentials.' }] });
  };

  // *** slug should be optional?, purpose is to remove emojis, perhaps apply to first or last names?
  // *** lower: false, means caps are not turned lowercase, all but numbers and letters are replaced via ' '
  // username = slug(req.body.username, {replacement: ' ', lower: false});
  firstName = slug(firstName, {replacement: ' ', lower: false});
  lastName = slug(lastName, {replacement: ' ', lower: false});

  console.log("checking passwords")
  if (password !== password2) {
    if (req.file) {
      await removeOnErr(req.file.filename);
    }
    return res.status(400).send([{ errors: [{ msg: "Passwords do not match." }] }]);
  };

  console.log("checking email")
  if (!email || !email.includes('@')) {
    if (req.file) {
      await removeOnErr(req.file.filename);
    }
    console.log(email)
    return res.status(400).send({ errors: [{ msg: "Invalid credentials." }] });
  }

  console.log("checking username")
  if (!username) {
    if (req.file) {
      await removeOnErr(req.file.filename);
    }
    return res.status(403).json({ errors: [{ msg: 'Invalid credentials.' }] });
  };

  let defaultAvatar = `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/v1636353979/blog/Default-welcomer_fhdikf.png`;
  let avatarImage = defaultAvatar;
  let avatarImageFilename = '';
  // *** role changes to admin when profile is created then blogs can be made
  // let roles = ['super-admin', 'admin', 'user', 'banned']
  let role = 'user';
  await db.connectToDB();
  const findUserByEmail = await User.findOne({ email });

  if (findUserByEmail) {
    if (req.file) {
      await removeOnErr(req.file.filename);
    }
    return res.status(403).json({ errors: [{ msg: "User email already exists!"}] });
  };

  const findUserByUsername = await User.findOne({ username });

  if (findUserByUsername) {
    if (req.file) {
      await removeOnErr(req.file.filename);
    }
    return res.status(403).json({ errors: [{ msg: "Username already exists!"}] });
  };

  if (req.file && req.file.path) {
    // if (req.file.path) {
      avatarImage = req.file.path;
      avatarImageFilename = req.file.filename;
    // }
  }
  // if storing with diskstorage setup for multer
  if (avatarImage.startsWith('public\\')) {
    let editImgUrl = avatarImage.slice(6);
    avatarImage = editImgUrl;
  }

  let salt = await bcrypt.genSalt(11);
  let encryptedPassword = await bcrypt.hash(password, salt);

  let user = await new User({ firstName, lastName, username, email, avatarImage, avatarImageFilename, password: encryptedPassword, role });
  
  console.log("user generated")
  console.log(user)
  // ?? breaks here
  let jwtAccessToken = accessTokenGenerator(user._id, user.role);
  
  console.log("cookie options")
  let cookieOptions = accessTokenCookieOptions();

  res.setHeader(
    "Set-Cookie",
    cookie.serialize("blog__token", jwtAccessToken, cookieOptions)
  );

  // res.cookie('token', jwtAccessToken, cookieOptions);
  console.log("cookie made")
  await user.save();
  await db.disconnect();

  if (user.password) {
    console.log(user.password)
    user.password = undefined;
    console.log("==============")
    console.log(user.password)
  }
  console.log("user - final check")
  console.log(user)
  return res.status(201).json({
    status: "User registered!",
    // TODO; after registration, redirect to sign in
    // data: { valid: true }
    // data: { token: jwtToken }
    data: { user }
  });
});

// handler.get(async (req, res) => {
//   res.status(200).json({
//     status: "User registered!"
//   })
// })

export default handler;