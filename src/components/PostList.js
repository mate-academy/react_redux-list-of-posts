import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { selectPosts } from '../store/store';
import Post from './Post';

const PostList = ({ posts }) => posts.map(post => (
  <Post key={post.id} post={post} />
));

const mapStateToProps = state => ({
  posts: selectPosts(state),
});

export default connect(mapStateToProps)(PostList);

PostList.propTypes = { posts: PropTypes.arrayOf(PropTypes.object).isRequired };
