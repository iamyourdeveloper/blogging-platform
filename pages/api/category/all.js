import nc from 'next-connect';
import { onError, onNoMatch } from '@/utils/ncOptions';
import db from '@/utils/database';
import Post from '@/models/Post';

// *** upload all existing categories to client upon homepage
// *** show single blog post of user
// *** frontend
// *** /api/[username]/[category]/[slug]
// *** backend
// *** /api/category/all
// *** sllug is post / article id
const handler = nc({onError, onNoMatch});

// *** insomnia tested - passed
handler.get(async (req, res) => {
  await db.connectToDB();
  const categories = await Post.find().distinct('category');
  await db.disconnect();
  res.status(200).json({
    status: "Available categories.",
    data: {
      categories
    }
  })
});
export default handler;