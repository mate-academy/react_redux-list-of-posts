import React from 'react';
import PropTypes from 'prop-types';
import Post from '../Post/Post';

const PostList = ({ posts }) => (
  posts.map(post => <Post key={post.id} post={post} />));

PostList.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      userId: PropTypes.number,
      title: PropTypes.string,
      body: PropTypes.string,
    })
  ).isRequired,
};

export default PostList;
