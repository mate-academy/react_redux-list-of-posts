import React from 'react';
import PropTypes from 'prop-types';

import Post from './Post';

const PostList = ({ posts, highlightedValue }) => (
  <div className="posts-container">
    {posts.map(
      post => (
        <Post
          highlightedValue={highlightedValue}
          key={post.id}
          {...post}
        />
      )
    )}
  </div>
);

PostList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
  highlightedValue: PropTypes.string.isRequired,
};

export default PostList;
