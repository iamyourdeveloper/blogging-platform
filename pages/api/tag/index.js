import nc from 'next-connect';
import { ncOnError } from '../../utils/ncOptions';
import { connectToDB } from '../../../utils/database';
// import { findUserById, }
const { db } = await connectToDB();
// TODO --- consider deleting this file, tags will be sorted in the front end search OR in /api/posts/index.js
// ROUTE
// /api/[username]/

// get all posts user made on blog, essentially a feed
const handler = nc(ncOnError);
// handler.use(connectToDB)
// handler.use(auth); // auth validation, ensure correct user role for access

handler.get(async (req, res) => {
  // const user = await db.collection("posts").find({}).sort({ date: -1 }).toArray();
  // pagination
  // *** Build pagination?
  const userPosts = await db.collection("posts").find({}).sort({ date: -1 }).limit(20).toArray();


  res.statusCode(200).json({
    status: "User posts found.",
    data: userPosts
  });
});