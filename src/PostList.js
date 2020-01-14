import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPosts } from './redux/store';
import Post from './Post';

const PostList = ({ posts }) => (
  posts.map(post => (
    <Post key={post.id} post={post} />
  ))
)

const mapStateToProps = state => ({
  posts: getPosts(state)})

export default connect(mapStateToProps)(PostList)

PostList.propTypes = { posts: PropTypes.arrayOf(PropTypes.shape({
  id: PropTypes.number.isRequired,
})).isRequired };
