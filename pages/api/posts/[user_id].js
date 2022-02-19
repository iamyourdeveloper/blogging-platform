import nc from 'next-connect';
import { onError, onNoMatch } from '@/utils/ncOptions';
import db from '@/utils/database';
import User from '@/models/User';
import Post from '@/models/Post';

// *** interact with search bar located in user blog homepage, get all blog posts matching query
// /[username]/blog/ <-FE
// /api/posts/[user_id] <- BE
const handler = nc({onError, onNoMatch});

handler.get(async (req, res) => {
  const {
    user_id,
    // username, // used with id, user page
    category,
    tag,
    keyword,
    pageNumber,
    offsetItems
  } = req.query;
  let page = Number(pageNumber);
  if (page < 1) page = 1;
  let limit = Number(offsetItems) || 12;
  let offset = (page - 1) * limit;
  let count;
  let totalBlogs;
  let blogs;
  const rgx = (pattern) => new RegExp(`.*${pattern}.*`);
  // TODO --- check if category, tag are empty stings
  let keywordTrim = keyword.trim();
  let keywordRGX = rgx(keywordTrim);
  let categoryTrim = category.trim();
  let categoryRGX = rgx(categoryTrim);
  let tagTrim = tag.trim();
  let tagRGX = rgx(tagTrim);

  console.log(keyword)
  console.log(category)
  console.log(tag)
  console.log("----RGX---")
  console.log(keywordRGX)
  console.log(categoryRGX)
  console.log(tagRGX)

  const keywordFilter = keywordRGX && keywordRGX !== 'null' ? {
    $and: [
      {user: user_id},
      {title: { $regex: keywordRGX, $options: "i" }}
    ]
  } : {};

  const categoryFilter = categoryRGX && categoryRGX !== 'null' ? {
    category: { $regex: categoryRGX, $options: "i" }
  } : {};

  const tagFilter = tagRGX && tagRGX !== 'null' ? {
    tags: {$in: tagRGX}
  } : {};
   
  // *** search all posts, return those where title or username match keyword
  await db.connectToDB();

  totalBlogs = await Post.countDocuments({
    ...keywordFilter,
    ...categoryFilter,
    ...tagFilter,
  });

  blogs = await Post.find(
    {
      ...keywordFilter,
      ...categoryFilter,
      ...tagFilter,
    }
  ).skip(offset).limit(limit).sort({"timestamps": -1}).lean();

  await db.disconnect();
  count = totalBlogs;

  return res.status(200).json({
      status: "Product data retrieved.",
      data: {
        posts: blogs,
        page: page,
        pages: count // total count of posts
      }
  });
});

export default handler;
/*
#####################################################
original version of route
#####################################################
import nc from 'next-connect';
import { onError, onNoMatch } from '../../../utils/ncOptions';
import db from '../../../utils/database';
import User from '../../../models/User';
import Post from '../../../models/Post';

// *** get all blog posts of username, use in user blog hompage feed
// /[username]/blog/ <-FE
// /api/posts/[user_id] <- BE
const handler = nc({onError, onNoMatch});

handler.get(async (req, res) => {
  const {
    user_id,
    category,
    tag,
    username,
    limit,
    currentPage
  } = req.query;
  // TODO --- look into sending multiple queries (category, tag, username) to this route
  // TODO --- implement pagination
  // *** searching for all posts by username requires regex
  await db.connectToDB();
  // TODO --- move this search query to client side search bar
  // const user = await User.findOne({
  //   name: {
  //     $regex: username,
  //     $options: 'i',
  //   },
  // });
  // TODO --- move this search query to client side search bar
    
  const posts = await Post.find({
    user: user_id
  }).sort({ "timestamp": -1 });
  // }).sort({ createdAt: -1 });
  await db.disconnect();

  // TODO --- consider looping through posts to change timestamp date to ISOString
  res.status(200).json({
    status: "All posts for blog.",
    data: {
      // user,
      posts
    }
  })
});

export default handler;
#####################################################
#####################################################
*/