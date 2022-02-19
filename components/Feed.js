// import React, { useState, useContext } from 'react';
// import Link from 'next/link';
// import api from '@/utils/api';

// const Feed = ({posts}) => {

//   return (
//     <section>
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
// export default Feed;