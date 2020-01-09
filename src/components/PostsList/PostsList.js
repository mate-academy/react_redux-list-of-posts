import React from 'react';
import PropTypes from 'prop-types';
import Post from '../Post';
import './PostsList.css';

const PostsList = ({ posts }) => (
  <div className="post-list">
    { posts.map(post => (
      <Post key={post.id} post={post} />
    ))}
  </div>
);

export default PostsList;

PostsList.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
    }).isRequired,
  ).isRequired,
};
