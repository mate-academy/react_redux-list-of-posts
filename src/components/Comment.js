import React from 'react';
import PropTypes from 'prop-types';

export function Comment(props) {
  const {
    commentItemRemove,
    body,
    commentAuthorName,
    id,
  } = props;

  return (
    <section>
      <p>{body}</p>
      <span>{commentAuthorName}</span>
      <div>
        <button
          type="button"
          onClick={() => commentItemRemove(id)}
        >
            Remove comment!
        </button>
      </div>
    </section>
  );
}

Comment.propTypes = {
  commentItemRemove: PropTypes.func.isRequired,
  body: PropTypes.string.isRequired,
  commentAuthorName: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};
