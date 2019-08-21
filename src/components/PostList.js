import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getPosps, getSearchProps, getSearchText, searchFields,
} from './store';
import Post from './Post/Post';

const getFiltringFunk = (byField, value) => {
  switch (byField) {
    case searchFields.b:
      return post => post.body.includes(value);
    case searchFields.t + searchFields.b:
      return post => post.title.includes(value) || post.body.includes(value);
    default:
      return post => post.title.includes(value);
  }
};

const PostList = ({ posts, searchText, searchProps }) => {
  let filtredPosts = [];
  if (searchText !== '') {
    filtredPosts = posts.filter(getFiltringFunk(searchProps, searchText));
  } else {
    filtredPosts = [...posts];
  }

  return (
    <div>
      <div className="count-of-pages">
        {`${filtredPosts.length} of ${posts.length}`}
      </div>
      {
        filtredPosts.map(post => (
          <Post {...post} key={post.id} />
        ))
      }
    </div>
  );
};

PostList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    body: PropTypes.string,
    comments: PropTypes.arrayOf(PropTypes.object),
    id: PropTypes.number,
    user: PropTypes.shape({
      name: PropTypes.string,
      username: PropTypes.string,
      email: PropTypes.string.isRequired,
      address: PropTypes.object,
    }),
  })).isRequired,
  searchText: PropTypes.string.isRequired,
  searchProps: PropTypes.string.isRequired,
};

const getData = state => ({
  posts: getPosps(state),
  searchText: getSearchText(state),
  searchProps: getSearchProps(state),
});

export default connect(getData, {})(PostList);
