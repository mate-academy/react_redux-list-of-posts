import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import uuid from 'uuidv4';
import Post from '../Post/Post';
import { getfilteredPosts } from '../../store';

const PostList = ({ filteredPosts }) => (
  filteredPosts.map(item => (
    <Post post={item} key={uuid()} />
  ))
);

PostList.propTypes = {
  filteredPosts: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    body: PropTypes.string,
    user: PropTypes.shape({
      name: PropTypes.string,
      email: PropTypes.string,
      address: PropTypes.shape({
        street: PropTypes.string,
        suite: PropTypes.string,
        city: PropTypes.string,
      }),
    }),
    comments: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      body: PropTypes.string,
      email: PropTypes.string,
      user: PropTypes.shape({
        name: PropTypes.string,
      }),
    })),
  })).isRequired,
};

const getData = state => ({
  filteredPosts: getfilteredPosts(state),
});

export default connect(
  getData,
)(PostList);
