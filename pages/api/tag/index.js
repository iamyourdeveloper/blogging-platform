import nc from 'next-connect';
import { onError, onNoMatch } from '@/utils/ncOptions';
import db from '@/utils/database';
import Post from '@/models/Post';

// TODO --- consider deleting this file, tags will be sorted in the front end search OR in /api/posts/index.js

// get all posts user made on blog, essentially a feed
const handler = nc({onError, onNoMatch});

handler.get(async (req, res) => {
  const userPosts = await Post.find({})
  // const user = await db.collection("posts").find({}).sort({ date: -1 }).toArray();
  // pagination
  // *** Build pagination?
  // const userPosts = await db.collection("posts").find({}).sort({ date: -1 }).limit(20).toArray();


  res.status(200).json({
    status: "User posts found.",
    data: {
      posts: userPosts
    }
  });
});