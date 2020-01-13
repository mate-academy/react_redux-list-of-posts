import React from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line no-shadow
const CommentItem = ({ comment: { name, body, email } }) => (
  <div className="comment">
    <h3 className="comment-name">{name}</h3>
    <p className="comment-body">{body}</p>
    <p className="comment-email">
      <span>By </span>
      {email}
    </p>
    <button
      className="delete-comment"
      type="button"
    >
      Delete comment
    </button>
    <hr/>
  </div>
);

CommentItem.propTypes
  = { comment: PropTypes.oneOfType([PropTypes.object]).isRequired };

export default CommentItem;
