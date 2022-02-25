import { useEffect, useState, useContext } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import api from '@/utils/api';
// TODO: consider sending posts to feed comp?
// import Feed from '../components/Feed';

// TODO: this comp is untested. list posts manipulated via search input (username, keyword, category, tags, etc.).
// TODO: create a mini search bar comp / input to search within username posts
// /[username]

export const Username = () => {
  const router = useRouter();
  // const { state, dispatch } = useContext(Store);
  // const userInfo = state.userInfo;
  // user provides a username in browser url
  const { username } = router.query;

  const [usernameExists, setUsernameExists] = useState(username || '');
  const [categories, setCategories] = useState('');
  // const [category, setCategory] = useState(category !== 'All' ? category : '' || '');
  const [category, setCategory] = useState('All');
  const [tag, setTag] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  // for pagination
  // const [currentPage, setCurrentPage] = useState(page || 1);
  const [currentPage, setCurrentPage] = useState(1);
  const [offset, setOffset] = useState('');
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // for data fetching and page loading purposes

  /*
  upon state change, re-render posts (default is that all posts are searched for, acting as a general post). Client-side. May not be SEO friendly, but I think it may the best way of handling conditions. I think it is the best choice. Just need to combine with useContext (if needed).
  */
  
  const fetchCategories = async () => {
    let { data } = await api.get('/api/category/all');
    console.log(data);
    setCategories(data.data.categories);
  };

  // default param values to allow for default general search
  const fetchPosts = async (username = '', category, tag, searchTerm, currentPage, offset) => {
    let { data } = await api.get(`/api/posts/${username}?category=${category}&tag=${tag}&keyword=${searchTerm}&pageNumber=${currentPage}&offsetItems=${offset}`);
    console.log(data);
    // may need to place into a useContext state
    setPosts(data.data.posts);
    setCurrentPage(data.data.page);
    setOffset(data.data.pages);
  };

  useEffect(() => {
    // get all exiting categories
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchPosts(usernameExists, category, tag, searchTerm, currentPage, offset);
  }, [usernameExists, category, tag, searchTerm, currentPage, offset]);

  const categoryHandler = (e) => {
    setIsLoading(true);
    setCurrentPage(1);
    setCategory(e.target.value);
  }

  return (
    <section>
      {/* <Feed posts={posts} /> */}
      {/* <form onSubmit={formSubmit}> */}
        <div className="form__group">
          <label htmlFor="tag">Tags: </label>
          <input 
            name="tag"
            type="text"
            placeholder="seperate, tags,by,comma"
            onChange={(e) => setTag(e.target.value)}
          />
        </div>
        {/* <button type="submit">Search</button> */}
      {/* </form> */}
        <div className="form__group">
          <label htmlFor="tag">Category: </label>
          <input 
            name="tag"
            type="text"
            placeholder="seperate, tags,by,comma"
            onChange={(e) => setTag(e.target.value)}
          />
        </div>
        <div className="form__group">
          {/* <select name="category" value={category} onChange={e => categoryChange(e)}>
            {categories.map((category, index) => (
              <option value={category.category} key={index}>{category.category}</option>
            ))}
          </select> */}
        </div>

    {isLoading ? (
      <>
        <div>Loading...</div>
      </>
    ) : posts ? (
      <div className="feed-wrapper">
        <div className="feed">
          <p>Create new post. Must be logged in.</p>
          {/* <PostForm /> */}
        </div>
        <div className="feed__posts">
          {posts && posts.length > 0 ? (
            <>
              {/* {data.posts && data.posts.map((post, i) => <PostItem post={post} key={i} />)} */}
            </>
          ) : (
            <div>
              No posts found. Follow profiles in order to start seeing posts in your feed or visit <Link href="/"><a>general feed</a></ Link>. Or clear all search constraints.
            </div>
          )}
        </div>
      </div>
    ) : (
      <>
        <div>You could get rid of this fragment section</div>
        <div>No posts found. Please try another search.</div>
      </>
    )}
    </section>
  )
}
export default Username;