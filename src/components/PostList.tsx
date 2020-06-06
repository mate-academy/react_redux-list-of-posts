import React, { useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import debounce from 'lodash/debounce';

import Post from './Post';

import {getPosts, getQuery} from '../store';
import {setQuery} from '../store/query';

const PostList: React.FC = () => {
  const dispatch = useDispatch();
  const posts = useSelector(getPosts);
  const query = useSelector(getQuery);
  const [filterQuery, setfilterQuery] = useState('');


  const getVisiblePosts = (allPosts: PostWithUser[], searchQuery: string) => {
    const pattern = new RegExp(searchQuery, 'i');

    return allPosts.filter(({ body, title }) => pattern.test(body + title))
  }

  const vissiblePosts = useMemo(
    () => getVisiblePosts(posts, filterQuery),

    [filterQuery, posts]
  );

  const setfilterQueryWithDebonce = useCallback(
    debounce(setfilterQuery, 1000),
    []
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setQuery(event.target.value));
    setfilterQueryWithDebonce(event.target.value)
  }

  return (
    <>
      <label htmlFor="filter" className="filter__text">
        Filter posts:
          </label>
      <input
        type="text"
        id="filter"
        className="filter__field"
        placeholder="enter word..."
        value={query}
        onChange={handleChange}
      />

      <ul className="posts">
        {vissiblePosts.map(post => (
          <Post post={post} key={post.id} />
        ))}
      </ul>
    </>
  )
}

export default PostList;

