import React from 'react';
import PropTypes from 'prop-types';
import { PostHandler } from './PostHandler';

export function PostList(props) {
  const {
    requested,
    usersLoaded,
    postsLoaded,
    commentsLoaded,
    filterChanged,
    handleClick,
    filteredPosts,
  } = props;
  if (!requested) {
    return (
      <button
        type="button"
        onClick={handleClick}
      >
        Download posts!
      </button>
    );
  } if (usersLoaded && postsLoaded && commentsLoaded) {
    const items = filteredPosts.map((post, index) => (
      <PostHandler
        key={post.id}
        userId={post.userId}
        title={post.title}
        body={post.body}
        id={post.id}
        index={index}
      />
    ));

    return (
      <div>
        <input
          type="text"
          placeholder="search by title"
          onChange={filterChanged}
        />
        <table>
          <thead>
            <tr>
              <th>Post</th>
              <th>User</th>
              <th>Comments</th>
            </tr>
          </thead>
          <tbody>
            {items}
          </tbody>
        </table>
      </div>
    );
  }
  return (
    <button type="button" disabled>Loading...</button>
  );
}

PostList.propTypes = {
  requested: PropTypes.bool.isRequired,
  usersLoaded: PropTypes.bool.isRequired,
  postsLoaded: PropTypes.bool.isRequired,
  commentsLoaded: PropTypes.bool.isRequired,
  filterChanged: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  filteredPosts: PropTypes.arrayOf(PropTypes.object),
};

PostList.defaultProps = {
  filteredPosts: null,
};
