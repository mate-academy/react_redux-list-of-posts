import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Post from './Post';

const PostList = ({ posts, filterPosts }) => {
  const [inputValue, setinputValue] = useState('');

  const handleInput = (input) => {
    setinputValue(input.toLowerCase().trimLeft());
    filterPosts(inputValue);
  };

  return (
    <>
      Enter text to filter posts by title or body:&nbsp;
      <input
        className="filter--input"
        type="text"
        value={inputValue}
        onChange={e => handleInput(e.target.value)}
      />
      <h4>
        {posts.length}
        &nbsp;post(s) are shown
      </h4>
      {posts.map(
        post => <Post key={post.id} post={post} />
      )}
    </>
  );
};

PostList.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.object
  ).isRequired,
  filterPosts: PropTypes.func.isRequired,
};

export default PostList;
