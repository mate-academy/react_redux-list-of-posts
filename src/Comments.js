/* eslint-disable no-shadow */
import React from 'react';
import PropsTypes from 'prop-types';
import { connect } from 'react-redux';
import User from './User';
import { delComment } from './store/posts';

const Comments = ({ postId, postComments, delComment }) => (
  <div className="post__comments">
    {postComments.map(comment => (
      <div className="comment">
        <button
          type="button"
          className="comment__delete"
          onClick={() => delComment(postId, comment.id)}
        >
          X
        </button>
        <p>
          {comment.body}
        </p>
        <User person={comment} />
      </div>
    ))}
  </div>
);

Comments.propTypes = {
  postId: PropsTypes.number.isRequired,
  postComments: PropsTypes.arrayOf.isRequired,
  delComment: PropsTypes.func.isRequired,
};

export default connect(null, { delComment })(Comments);
