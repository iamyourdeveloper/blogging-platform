import nc from 'next-connect';
import { onError, onNoMatch } from '@/utils/ncOptions';
import db from '@/utils/database';
import User from '@/models/User';
import Post from '@/models/Post';

// *** interact with search bar right from the initial homepage of the site, get all blog posts
// *** sort via various url queries: username, tagname, etc.
// / <-FE
// /api/posts/index <- BE
const handler = nc({onError, onNoMatch});

handler.get(async (req, res) => {
  const {
    // user_id,
    // username, // used with id, user page
    category,
    tag,
    keyword, // used to find post by title or usename
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
  // TODO --- check if category, tag are empty stings?
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
    $or: [
      {title: { $regex: keywordRGX, $options: "i" }},
      {username: { $regex: keywordRGX, $options: "i" }}
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
  if (keyword.length > 0 && keyword !== 'null') {
    let keywordTrim = keyword.trim();
    let keywordRGX = rgx(keywordTrim);
    if (category === '' || category === 'null' || !category) {
      // *** total count of matching posts
      totalBlogs = await Pool.find({
        $or: [
          {title: { $regex: keywordRGX, $options: "i" }},
          {username: { $regex: keywordRGX, $options: "i" }}
        ]
      }).estimatedDocumentCount();

      // *** get info, matching posts
      blogs = await Pool.find({
        $or: [
          {title: { $regex: keywordRGX, $options: "i" }},
          {username: { $regex: keywordRGX, $options: "i" }}
        ]
      }).skip(offsetItems).limit(limit).sort({"timestamps": -1});
    }

    // *** if category is applied
    if (category && category.length > 0) {
      let keywordTrim = keyword.trim();
      let keywordRGX = rgx(keywordTrim);
      let categoryTrim = category.trim();
      let categoryRGX = rgx(categoryTrim);
      totalBlogs = await Pool.find({
        $and: [
          { category: { $regex: categoryRGX, $options: "i" } },
          {
            $or: [
              {title: { $regex: keywordRGX, $options: "i" }},
              {username: { $regex: keywordRGX, $options: "i" }},
            ]
          }
        ]
        
      }).estimatedDocumentCount();

      // *** get info, matching posts
      blogs = await Pool.find({
        $and: [
          { category: { $regex: categoryRGX, $options: "i"} },
          {
            $or: [
              {title: { $regex: keywordRGX, $options: "i" }},
              {username: { $regex: keywordRGX, $options: "i" }}
            ]
          }
        ]
      }).skip(offsetItems).limit(limit).sort({"timestamps": -1});
    }
  }
    
  const posts = await Post.find({
    user: user_id
  }).sort({ "timestamp": -1 });
  // }).sort({ createdAt: -1 });


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

/*
let { keyword, category, pageNumber, offsetItems } = req.query;
  let page = Number(pageNumber) || 1;
  if (page < 1) page = 1;
  let totalProducts;
  let products;
  let limit = Number(offsetItems) || 12;
  let offset = (page - 1) * limit;
  let count;

  try {
    const queryPromise = (query, ...values) => {
      return new Promise((resolve, reject) => {
        pool.query(query, values, (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        });
      });
    }

    if (keyword.length > 0 && keyword !== 'null') {
      let keywordTrimmed = keyword.trim();
      if (category === '' || category === 'null' || !category) {
        // console.log("using keyword, no category, querying products");
        totalProducts = await pool.query(
          'SELECT COUNT(id) FROM products WHERE name ILIKE $1;', ['%' + keywordTrimmed + '%']
        )
        products = await pool.query(
          'SELECT P.*, I.* FROM products AS P JOIN images AS I ON P.id = I.product_id WHERE P.name ILIKE $1 GROUP BY I.id, P.id LIMIT $2 OFFSET $3;', ['%' + keywordTrimmed + '%', limit, offset]
        );
      }
      
      if (category && category.length > 0) {
        // console.log("using keyword, with category, querying products");
        totalProducts = await pool.query(
          'SELECT COUNT(id) FROM products WHERE name ILIKE $1 AND category = $2;', ['%' + keywordTrimmed + '%', category]
        )
        products = await pool.query(
          'SELECT P.*, I.* FROM products AS P JOIN images AS I ON P.id = I.product_id WHERE P.name ILIKE $1 AND category = $2 GROUP BY I.id, P.id LIMIT $3 OFFSET $4;', ['%' + keywordTrimmed + '%', category, limit, offset]
        );
      };
    }

    if (keyword === '' || keyword.length === 0 || !keyword) {
      if (category === '' || category === 'null' || !category) {
        // console.log("querying products, no keyword, no category");
        totalProducts = await pool.query(
          'SELECT COUNT(id) FROM products;'
        )
        products = await pool.query(
          'SELECT P.*, I.* FROM products AS P JOIN images AS I ON P.id = I.product_id GROUP BY I.id, P.id LIMIT $1 OFFSET $2;', [limit, offset]
        );
      };
      
      if (category && category.length > 0) {
        // console.log("querying products, no keyword, with category");
        totalProducts = await pool.query(
          'SELECT COUNT(id) FROM products WHERE category = $1;', [category]
        )
        products = await pool.query(
          'SELECT P.*, I.* FROM products AS P JOIN images AS I ON P.id = I.product_id WHERE P.category = $1 GROUP BY I.id, P.id LIMIT $2 OFFSET $3;', [category, limit, offset]
        );
      };
    };

    count = totalProducts.rows[0].count;
    Number(count);

    if (products.rows.length > 0) {
      if (products.rowCount >= 1) {
        for (let i = 0; i < products.rows.length; i++) {
          let created_at = products.rows[i].created_at;
          let newCreatedAt = created_at.toISOString().slice(0, 10);
          products.rows[i].created_at = newCreatedAt;
        }
      };
      for (let i = 0; i < products.rows.length; i++) {
        const productReviewsQuery = 'SELECT TRUNC(AVG(rating), 2) AS review_avg, COUNT(rating) FROM reviews WHERE product_id = $1;';
        const productReviewsProm = await queryPromise(productReviewsQuery, products.rows[i].product_id);
        let productReviews = productReviewsProm.rows[0];
        products.rows[i] = { ...products.rows[i], ...productReviews };
      }
    }

    
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error...");
  }
*/