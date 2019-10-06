import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { delPost } from '../store';
import User from '../User';
import CommentList from '../CommentList/CommentList';
import './post.css';

const Post = ({
  title, body, comments, user, id, deletePost,
}) => (
  <div className="post-page">
    <div>
      <User {...user} />

      <button type="button" onClick={() => deletePost(id)}>
        Delete post
      </button>
    </div>

    <div className="post-page__post">
      <h2>{title}</h2>
      <div>{body}</div>
      <CommentList comments={comments} />
    </div>
  </div>
);

Post.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      email: PropTypes.string,
      name: PropTypes.string,
      body: PropTypes.string,
    })
  ),
  id: PropTypes.number.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string,
    username: PropTypes.string,
    email: PropTypes.string,
    address: PropTypes.object,
  }).isRequired,
  deletePost: PropTypes.func.isRequired,
};

Post.defaultProps = {
  comments: null,
};

const getMethods = dispatch => ({
  deletePost: value => dispatch(delPost(value)),
});

export default connect(null, getMethods)(Post);
