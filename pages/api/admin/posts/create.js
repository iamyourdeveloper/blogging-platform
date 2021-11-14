import nc from 'next-connect';
import multer from 'multer';
import { onError, onNoMatch } from '@/utils/ncOptions';
import db from '@/utils/database';
import { storage } from '@/utils/cloudinary';
import { validate } from '@/utils/validate';
import postSchema from '@/utils/validateSchemas';
import User from '@/models/User';
import Post from '@/models/Post';

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

const handler = nc({onError, onNoMatch});

// create new post in blog
handler.use(isAuth, admin, upload.single('image_url'), validate(postSchema)).post(async (req, res) => {
  // const { id } = req.user;
  // *** ensure category, tags, and themes are string arrs
  // *** tags entered as "1, 2, 3", string seperated by comments (no parenthesis) from front end input. Category could be the same way OR could be chosen by drop down menu of preloaded categories?
  // *** themes, im unsure of (never done before), for now - i will regard as tags in terms of input, but will limit to the first two inputs?
  let { title, text, category, tags, themes } = req.body;
  let imageUrl = '';
  let imageFilename = '';
  // let categoriesToArr;
  let tagsToArr;
  let themesToArr;
  let postDataCheck;

  if (!title) {
    return res.status(400).json({ errors: [{ msg: "Title is required."}] });
  }
  if (!text) {
    return res.status(400).json({ errors: [{ msg: 'Text is required.' }] });
  }

  await db.connectToDB();  
  const user = await User.findById(req.user.id).select('-password');

  if (!user) {
    return res.status(403).json({ errors: [{ msg: "No user was found. Please sign in. "}] });
  }

  // *** check if inputted values are empty, if so assign value of '' for uniformity
  // postDataCheck = { categories, tags, themes };
  postDataCheck = { category, tags, themes };
  
  for (const [key, value] of Object.entries(postDataCheck)) {
    if (!value) {
      postDataCheck[key] = ''; // console.log(value);
    }
  }

  // *** if tags & themes have string values
  // *** EX: "input, tag, theme, category, value"
  // *** take values of checked object (now in arr) and converting into array of strings for db storage
  let postChecked = Object.values(postDataCheck);
  [tagsChk, themesChk] = postChecked;

  if (typeof tagsChk === "string") {
    tagsToArr = tagsChk.split(',').map(tag => '' + tag.trim());
  };
  if (typeof themesChk === "string") {
    themesToArr = themesChk.split(',').map(theme => '' + theme.trim());
  };

  if (req.file && req.file.path) {
    imageUrl = req.file.path;
    imageFilename = req.file.filename;
  }
  if (imageUrl.startsWith('public\\')) {
    let editImgUrl = imageUrl.slice(6);
    imageUrl = editImgUrl;
  }

  const newPost = await new Post({
    // user: mongoose.Types.ObjectId(req.user._id), // req.user.id
    user: req.user._id, // req.user.id
    username: user.username,
    avatarImage: user.avatarImage,
    coverImage: imageUrl,
    coverImageFilename: imageFilename,
    title: title,
    text: text,
    category,
    tags: tagsToArr,
    themes: themesToArr
  })

  const post = await newPost.save();
  await db.disconnect();

  res.status(201).json({
    status: "Post created.",
    data: {
      post
    }
  });
});