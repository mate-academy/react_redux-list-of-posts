import React from 'react';
import { connect } from 'react-redux';
import Post from './Post';
import { getPosts } from './store';

const PostList = ({ posts }) => (
  posts.map(postData => (
    <Post post={postData} />
  ))
);

const mapStateToProps = state => ({
  posts: getPosts(state),
});

export default connect(mapStateToProps)(PostList);
