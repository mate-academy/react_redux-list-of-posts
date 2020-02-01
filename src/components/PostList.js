import React from 'react';
import PropTypes from 'prop-types';

import Post from './Post';

const PostList = ({ posts, deletePost, deleteComment }) => (
  <table className="ui red table">
    <thead>
      <tr>
        <th>Title</th>
        <th>The text of the post</th>
        <th>Authors name</th>
        <th>post comments</th>
      </tr>
    </thead>
    <tbody>
      {posts.map(post => (
        <Post
          post={post}
          key={post.id}
          deletePost={deletePost}
          deleteComment={deleteComment}
        />
      ))}
    </tbody>
  </table>
);

PostList.propTypes = {
  deletePost: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PostList;
