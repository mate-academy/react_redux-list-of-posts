import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPosts } from './redux/store';
import Post from './Post';

const PostList = ({ posts }) => posts.map(post => (
  <Post key={post.id} post={post} />
));

const mapStateToProps = state => ({
  posts: getPosts(state),
});

export default connect(mapStateToProps)(PostList);

PostList.propTypes = { posts: PropTypes.arrayOf(PropTypes.shape({
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    address: PropTypes.shape({
      city: PropTypes.string.isRequired,
      street: PropTypes.string,
      suite: PropTypes.string,
    }).isRequired,
  }).isRequired,
  comments: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  })).isRequired,
})).isRequired };
