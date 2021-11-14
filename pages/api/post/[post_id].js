import nc from 'next-connect';
import { onError, onNoMatch } from '@/utils/ncOptions';
import db from '@/utils/database';
import Post from '@/models/Post';

// /api/[username]/blog/post/[post_id].js
// show an indiv post in detail
// should be made available to the public
// handler.use(isAuth).get(async (req, res) => {

const handler = nc({onError, onNoMatch});

handler.get(async (req, res) => {
  // *** convert arrays to strings to make readable client side
  const { post_id } = req.query;
  await db.connectToDB();
  const postData = await Post.findById(post_id);
  await db.disconnect();

  if(!postData) {
    return res.status(403).json({ errors: [{ msg: "Failed to find post."}] });
  }

  // *** alternative could be putting this code client side
  // *** convert string array to string
  if (Array.isArray(postData.tags)) {
    postData.tags = postData.tags.join(', ');
  }
  if (Array.isArray(postData.themes)) {
    postData.themes = postData.themes.join(', ');
  }
  res.status(200).json({
    status: "Post retrieved.",
    data: {
      postData
    }
  });
});
export default handler;