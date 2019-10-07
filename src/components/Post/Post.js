import React from 'react';
import PropTypes from 'prop-types';
import User from '../User/User';
import CommentList from '../CommentList/CommentList';
import './Post.css';

const Post = (props) => {
  const {
    post,
    deletePostFromPostList,
  } = props;
  const {
    title, body, user, comments,
  } = post;

  return (
    <div className="post">
      <h2>{title}</h2>
      <p>{body}</p>
      <button
        onClick={() => { deletePostFromPostList(post.id); }}
        type="button"
        className="button-delete-item"
      >
        delete post
      </button>
      <hr />
      <User user={user} />
      <CommentList comments={comments} />
    </div>
  );
};

Post.propTypes = {
  deletePostFromPostList: PropTypes.func.isRequired,
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string,
      email: PropTypes.string,
      address: PropTypes.shape({
        street: PropTypes.string,
        suite: PropTypes.string,
        city: PropTypes.string,
        zipcode: PropTypes.string,
      }),
    }).isRequired,
    comments: PropTypes.arrayOf(
      PropTypes.shape({
        postId: PropTypes.number.isRequired,
        id: PropTypes.number.isRequired,
        name: PropTypes.string,
        email: PropTypes.string,
        body: PropTypes.string,
      }).isRequired,
    ).isRequired,
    title: PropTypes.string,
    body: PropTypes.string,
  }).isRequired,
};

export default Post;
