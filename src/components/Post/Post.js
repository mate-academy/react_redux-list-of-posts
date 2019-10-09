import React from 'react';
import './Post.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CommentList from '../CommentList/CommentsList';
import User from '../User/User';
import { deletePost } from '../../store';

function Post({ post, deleteIdPost }) {
  const {
    title,
    body,
    comments,
    id,
  } = post;

  return (
    <ul className="list-group post">
      <p className="list-group-item list-group-item-primary post__head">
        <button
          id={id}
          type="button"
          className="btn btn-danger btn-sm btn-del"
          title="Delete post"
          onClick={({ target }) => deleteIdPost(Number(target.id))}
        >
          x
        </button>
        {title}
      </p>
      <p className="list-group-item list-group-item-primary post__body">
        {body}
      </p>
      <User user={post.user} />
      <CommentList comments={comments} />
    </ul>
  );
}

Post.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    userId: PropTypes.number,
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
  }).isRequired,
  deleteIdPost: PropTypes.func.isRequired,
};

const getMethod = dispatch => ({
  deleteIdPost: id => dispatch(deletePost(id)),
});

export default connect(
  null,
  getMethod
)(Post);
