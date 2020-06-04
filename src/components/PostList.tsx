import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  getVisiblePosts, isVisible } from '../store';
import { Post } from './Post';
import { setQuery } from '../store/query';
import debounce from 'lodash.debounce';

const PostList = () => {
  const posts: PreparedPost[] = useSelector(getVisiblePosts);
  const dispatch = useDispatch();
  const [value, setValue] = useState('');
  const isHidden = useSelector(isVisible);

  const setQueryWithDebounce = useCallback(
    debounce((value: string) => dispatch(setQuery(value)), 500), []
  )

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const { value } = event.target as HTMLInputElement;
    setValue(value)
    setQueryWithDebounce(value);
  }

  return (
    <>
      {isHidden &&
      <input
        className="post__input"
        placeholder="Enter words for searching"
        type="text"
        value={value}
        onChange={handleChange}
      />}
      <ul className="post__list">
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </ul>
      </>
  )
};

export default PostList;
