// consider deleting
import React, { useState } from 'react';
import { useRouter } from 'next/router';
// works like useEffect; optimized for nextjs
import useSWR from 'swr';
import { fetcher } from '@/utils/fetcher';
import { FaSearch } from 'react-icons/fa';

// TODO: consider deleting this comp
const Search = () => {
  const history = useHistory();
  const [keyword, setKeyword] = useState('');
  const router = useRouter();

  // TODO --- figure out a way to clear search bar upon submission
  const searchHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      // history.push(`/search/${keyword}`);
      // TODO: ensure component router sees url keyword as a param or query
      history.push(`/posts/${keyword}`);
    //   // setKeyword('');
    } else {
      history.push(`/shop`);
    };
  };

  return (
    <section className="search">
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