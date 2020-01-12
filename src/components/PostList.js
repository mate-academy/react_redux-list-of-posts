import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getPosts,
} from '../redux/store';
import Post from './Post';

const PostList = ({ posts }) => (
  <div className="posts">
    { posts.map(post => (
      <Post post={post} key={post.id} />
    )) }
  </div>
);

const mapStateToProps = state => ({
  posts: getPosts(state),
});

PostList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default connect(mapStateToProps,null)(PostList);
