import React, { useState } from 'react';
import { useRouter } from 'next/router';
// works like useEffect; optimized for nextjs
import useSWR from 'swr';
import { fetcher } from '@/utils/fetcher';
import { FaSearch } from 'react-icons/fa';

// TODO: this comp goes into navbar, used for general search
const Search = () => {
  const history = useHistory();
  // const [keyword, setKeyword] = useState('');
  const router = useRouter();

  // TODO --- figure out a way to clear search bar upon submission
  const searchHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      // history.push(`/search/${keyword}`);
      history.push(`/posts/search/${keyword}`);
    } else {
      history.push(`/shop`);
    };
  };

  return (
    <section className="search">
    {/* <div className="top-search">
        <form action="" method="get" className="search">
          <div className="search-field">
            <input type="search" name="search" placeholder="What are you looking for?" className="search-input" />
            <input type="submit" value="" className="button" />
          </div>
        </form>
      </div>
    <button className="nav-btn" onclick={(e) => searchHandler(e)}>
        Search
    </button> */}
      <form className="search__form" onSubmit={searchHandler}>
        <div className="search__input-group">
          <input
            type="text"
            className="search__input"
            placeholder="search products..."
            onChange={(e) => setKeyword(e.target.value)}
          />
          <div className="search__confirm-btn">
            <button className="search__btn">
              <FaSearch />
            </button>
          </div>
        </div>
      </form>
    </section>
  )
}
export default Search;