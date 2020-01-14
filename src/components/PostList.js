import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getSearchPosts } from '../store';
import Post from './Post';

const PostList = ({ posts }) => (
  <>
    <h1 className="count-posts">
      Count of posts:
      {' '}
      {posts.length}
    </h1>
    {posts.map(currentPost => (
      <Post post={currentPost} key={currentPost.id} />
    ))}
  </>
);

const mapStateToProps = state => ({
  posts: getSearchPosts(state),
});

PostList.propTypes = {
  posts: PropTypes.oneOfType([PropTypes.array]).isRequired,
};

export default connect(mapStateToProps)(PostList);
