import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { delCom } from './store';
import User from './User';

const Comment = ({ comment, deleteComment }) => (
  <div className="comment-list__comment">
    <User email={comment.email} />
    <div>
      <h4>{comment.name}</h4>
      <p>{comment.body}</p>
      <button type="button" onClick={() => deleteComment(comment.id)}>
        Delete comment
      </button>
    </div>
  </div>
);

Comment.propTypes = {
  comment: PropTypes.shape({
    email: PropTypes.string.isRequired,
    name: PropTypes.string,
    body: PropTypes.string.isRequired,
    id: PropTypes.number,
  }).isRequired,
  deleteComment: PropTypes.func.isRequired,
};

const getMethods = dispatch => ({
  deleteComment: value => dispatch(delCom(value)),
});

export default connect(null, getMethods)(Comment);
