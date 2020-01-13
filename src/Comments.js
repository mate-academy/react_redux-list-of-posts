import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteComment } from './store';

const Comments = ({ comment, deleteComment }) => (
  <li key={comment.id}>
    <h3 className="comment__name">
      {comment.name}
    </h3>
    <button
      type="button"
      className="button-delete"
      onClick={() => deleteComment(comment.id)}
    >
      Delete comment
    </button>
    <p className="comment__body">
      {comment.body}
    </p>
    <div className="comment__sender">
      {'Sender: '}
      <a href=" ">
        {comment.email}
      </a>
    </div>
  </li>
);

Comments.propTypes = {
  comment: PropTypes.shape({
    userId: PropTypes,
    id: PropTypes.number,
    name: PropTypes.string,
    email: PropTypes.string,
    body: PropTypes.string,
  }).isRequired,
  deleteComment: PropTypes.func.isRequired,
};

const makeStateToProps = state => ({
  posts: state.posts,
})

export default connect(
  makeStateToProps,
  { deleteComment }
)(Comments);
