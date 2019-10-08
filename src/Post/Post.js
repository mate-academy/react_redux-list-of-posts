import React from 'react';
import PropTypes from 'prop-types';
import CommentList from '../CommentList/CommentList';
import User from '../User/User';
import './Post.css';

const Post = ({ post, deletePost }) => {
  const { user, comments } = post;

  return (
    <div className="post">
      <h2 className="post__title">{post.title}</h2>
      <p>{post.body}</p>
      <User
        name={user.name}
        email={user.email}
        address={user.address}
      />
      <button type="button" onClick={() => deletePost(post.id)}>Delete post</button>
      <CommentList comments={comments} />
    </div>
  );
};

Post.propTypes = {
  post: PropTypes.shape({
    body: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    comments: PropTypes.arrayOf(
      PropTypes.shape({
        body: PropTypes.string,
        email: PropTypes.string,
        name: PropTypes.string,
      }).isRequired,
    ).isRequired,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      address: PropTypes.shape({
        city: PropTypes.string,
        street: PropTypes.string,
        suite: PropTypes.string,
        zipcode: PropTypes.string,
      }).isRequired,
    }).isRequired,
  }).isRequired,
  deletePost: PropTypes.func.isRequired,
};

export default Post;
