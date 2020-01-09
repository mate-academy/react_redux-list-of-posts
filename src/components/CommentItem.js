import React from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line no-shadow
const CommentItem = ({ name, email, body }) => (
  <div className="comment">
    <h3 className="comment__title">{`Comment: ${name}`}</h3>
    <p className="comment__content">{body}</p>
    <p className="comment__user-email">{email}</p>
  </div>
);

CommentItem.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
};

export default CommentItem;
