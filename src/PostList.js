import React from 'react';
import { connect } from 'react-redux';
import Post from './Post';

const PostList = ({ posts }) => (
  posts.map(postData => (
    <Post post={postData} />
  ))
);

const mapStateToProps = state => ({
  posts: state.visiblePosts,
});

export default connect(mapStateToProps)(PostList);
