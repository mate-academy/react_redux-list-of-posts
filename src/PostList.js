import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { getPosts, getQuery } from './store/store';
import Post from './Post';

const PostList = ({ posts, query }) => {
  const visiblePosts = posts
    .filter(({ title, body }) => (
      (title + body).toLowerCase().includes(query)));

  return (
    <dl>
      {visiblePosts.map(currentPost => (
        <Post
          post={currentPost}
          key={currentPost.id}
        />
      ))}
    </dl>
  );
};

PostList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
  })).isRequired,
  query: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  posts: getPosts(state),
  query: getQuery(state),
});

export default connect(mapStateToProps, null)(PostList);
