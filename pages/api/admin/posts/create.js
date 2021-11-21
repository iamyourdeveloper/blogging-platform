import nc from 'next-connect';
import multer from 'multer';
import { onError, onNoMatch } from '@/utils/ncOptions';
import { verifAuth, authRole } from '@/utils/verifAuth';
import db from '@/utils/database';
import { storage, removeOnErr } from '@/utils/cloudinary';
import User from '@/models/User';
import Post from '@/models/Post';

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

const handler = nc({onError, onNoMatch});
handler.use(verifAuth, authRole);

// create new post in blog
// *** insomnia tested - passed
handler.use(upload.single('image_url')).post(async (req, res) => {
  const { id } = req.user;
  console.log("user id");
  console.log(id)
  console.log(req.body)
  // *** ensure category, tags, and themes are string arrs
  // *** tags entered as "1, 2, 3", string seperated by comments (no parenthesis) from front end input. Category could be the same way OR could be chosen by drop down menu of preloaded categories?
  // *** themes, im unsure of (never done before), for now - i will regard as tags in terms of input, but will limit to the first two inputs?
  let { title, text, category, tags } = req.body;
  let imageUrl = '';
  let imageFilename = '';
  // let categoriesToArr;
  let tagsToArr;
  // let themesToArr;
  let postDataCheck;

  if (!title) {
    if (req.file) {
      await removeOnErr(req.file.filename);
    }
    return res.status(400).json({ errors: [{ msg: "Title is required."}] });
  }
  if (!text) {
    if (req.file) {
      await removeOnErr(req.file.filename);
    }
    return res.status(400).json({ errors: [{ msg: 'Text is required.' }] });
  }

  await db.connectToDB();  
  const user = await User.findById(req.user.id).select('-password');

  console.log("get user info for post");
  console.log(user);

  if (!user) {
    if (req.file) {
      await removeOnErr(req.file.filename);
    }
    return res.status(403).json({ errors: [{ msg: "No user was found. Please sign in. "}] });
  }

  // *** check if inputted values are empty, if so assign value of '' for uniformity
  // postDataCheck = { categories, tags, themes };
  // postDataCheck = { category, tags };
  postDataCheck = { tags };
  console.log("postDataCheck")
  console.log(postDataCheck)
  
  for (const [key, value] of Object.entries(postDataCheck)) {
    if (!value) {
      postDataCheck[key] = ''; // console.log(value);
    }
  }


  // *** if tags & themes have string values
  // *** EX: "input, tag, theme, category, value"
  // *** take values of checked object (now in arr) and converting into array of strings for db storage
  let postChecked = Object.values(postDataCheck);
  console.log("postChecked")
  console.log(postChecked)

  let [tagsChk] = postChecked;

  if (typeof tagsChk === "string") {
    tagsToArr = tagsChk.split(',').map(tag => '' + tag.trim());
  };

  if (req.file && req.file.path) {
    imageUrl = req.file.path;
    imageFilename = req.file.filename;
  }
  if (imageUrl.startsWith('public\\')) {
    let editImgUrl = imageUrl.slice(6);
    imageUrl = editImgUrl;
  }

  console.log("user._id")
  console.log(user._id)
  const post = await new Post({
    user: user._id, // req.user.id
    username: user.username,
    avatarImage: user.avatarImage,
    coverImage: imageUrl,
    coverImageFilename: imageFilename,
    title: title,
    text: text,
    category,
    tags: tagsToArr,
    // themes: themesToArr
  })

  // // const post = await newPost.save();
  await post.save();
  await db.disconnect();

  res.status(201).json({
    status: "Post created.",
    data: {
      post
    }
  });
});
export default handler;