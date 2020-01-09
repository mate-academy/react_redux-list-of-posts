import React from 'react';
import PropTypes from 'prop-types';
import Post from './Post';

const PostList = ({ posts }) => (
  <section className="post__list">
    {posts.map(post => (
      <Post key={post.id} post={post} />
    ))}
  </section>
);

export default PostList;

PostList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
};
