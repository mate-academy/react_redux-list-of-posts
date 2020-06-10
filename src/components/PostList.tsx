import React, { useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import debounce from 'lodash/debounce';
import { Post } from './Post';

import { getPosts, getFilter } from '../store';
import { setFilter } from '../store/filter';

interface Props {
  posts: PostType[];
}

export const PostList: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const posts = useSelector(getPosts);
  const query = useSelector(getFilter);


  const getVisiblePosts = (allPosts: PostType[], searchQuery: string) => {
    const pattern = new RegExp(searchQuery, 'i');

    return allPosts
      .filter(({ body, title }) => pattern.test(body + title));
  };

  const visiblePosts = useMemo(
    () => getVisiblePosts(posts, query),

    [query, posts],
);

  const setFilterQueryWithDebounce = useCallback(
    debounce(setFilter, 500),
    [],
  );


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    dispatch(setFilter(value));
    setFilterQueryWithDebounce(value);
  };

  return (
    <>
      <div className="wrapper">
        <h3 className="search-title">Search for posts:</h3>
        <label htmlFor="search">
          <input
            id="search"
            type="text"
            className="validate"
            placeholder="Type something to search post..."
            value={query}
            onChange={handleChange}
          />
        </label>
      </div>
      <ul className="post post__list">
        {visiblePosts.map((post => (
          <Post key={post.id} post={post} />
        )))}
      </ul>
    </>
  );
};
