// import { useEffect, useState, useContext } from 'react';
// import Head from 'next/head';
// import Link from 'next/link';
// import { useRouter } from 'next/router';
// import api from '@/utils/api';
// // import Feed from '../components/Feed';

// //*** this is a general search route, search all posts by title, decide which tags and categories to apply
// // posts/search?keyword=&category=&tag=&keyword=&pageNumber=&offsetItems=

// export const PostSearch = () => {
//   const router = useRouter();
//   const { state, dispatch } = useContext(Store);
//   const userInfo = state.userInfo;
//   const { keyword } = router.query;

//   const [categories, setCategories] = useState('');
//   const [category, setCategory] = useState(category !== 'All' ? category : '' || '');
//   const [tag, setTag] = useState('');
//   // get keyword from url (Search comp)
//   const [searchTerm, setSearchTerm] = useState(keyword || '');
//   const [currentPage, setCurrentPage] = useState(page || 1);
//   const [offset, setOffset] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [posts, setPosts] = useState([]);
//   /*
//   upon state change, re-render posts (default is that all posts are searched for, acting as a general post). Client-side. May not be SEO friendly, but I think it may the best way of handling conditions. I think it is the best choice. Just need to combine with useContext (if needed).
//   */
  
//   const fetchCategories = async () => {
//     let { data } = await api.get('/api/category/all');
//     console.log(data);
//     setCategories(data.data.categories);
//   };

//   // default param values to allow for default general search
//   const fetchPosts = async (searchTerm = '', category, tag, currentPage, offset) => {
//     let { data } = await api.get(`/api/posts?keyword=${searchTerm}&category=${category}&tag=${tag}&pageNumber=${currentPage}&offsetItems=${offset}`);
//     console.log(data);
//     // may need to place into a useContext state
//     setPosts(data.data.posts);
//     setCurrentPage(data.data.page);
//     setOffset(data.data.pages);
//   };

//   useEffect(() => {
//     // get all exiting categories
//     fetchCategories();
//   }, []);

//   useEffect(() => {
//     fetchPosts(searchTerm, category, tag, currentPage, offset);
//   }, [category, tag, searchTerm, currentPage, offset]);
  
//   const categoryHandler = (e) => {
//     setIsLoading(true);
//     setCurrentPage(1);
//     setCategory(e.target.value);
//   }

//   return (
//     <section>
//       {/* <Feed posts={posts} /> */}
//       {/* <form onSubmit={formSubmit}> */}
//         <div className="form__group">
//           <label htmlFor="tag">Tags: </label>
//           <input 
//             name="tag"
//             type="text"
//             placeholder="seperate, tags,by,comma"
//             onChange={(e) => setTag(e.target.value)}
//           />
//         </div>
//         {/* <button type="submit">Search</button> */}
//       {/* </form> */}
//         <div className="form__group">
//           <label htmlFor="tag">Category: </label>
//           <input 
//             name="tag"
//             type="text"
//             placeholder="seperate, tags,by,comma"
//             onChange={(e) => setTag(e.target.value)}
//           />
//         </div>
//         <div className="form__group">
//           <select name="category" value={category} onChange={e => categoryChange(e)}>
//             {categories.map((category, index) => (
//               <option value={category.category} key={index}>{category.category}</option>
//             ))}
//           </select>
//         </div>

//     {isLoading ? (
//       <>
//         <div>Loading...</div>
//       </>
//     ) : data ? (
//       <div className="feed-wrapper">
//         <div className="feed">
//           <p>Create new post. Must be logged in.</p>
//           {/* <PostForm /> */}
//         </div>
//         <div className="feed__posts">
//           {data.posts && data.posts.length > 0 ? (
//             <>
//               {/* {data.posts && data.posts.map((post, i) => <PostItem post={post} key={i} />)} */}
//             </>
//           ) : (
//             <div>
//               No posts found. Follow profiles in order to start seeing posts in your feed or visit <Link href="/"><a>general feed</a></ Link>. Or clear all search constraints.
//             </div>
//           )}
//         </div>
//       </div>
//     ) : (
//       <>
//         <div>You could get rid of this fragment section</div>
//         <div>No posts found. Please try another search.</div>
//       </>
//     )}
//     </section>
//   )
// }
// export default PostSearch;