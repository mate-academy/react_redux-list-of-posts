import React from 'react';

import PropTypes from 'prop-types';

import CommentHandle from '../Comment/CommentHandle';

function CommentList({ comments }) {
  return (
    <div>
      {comments
        .map(comment => (<CommentHandle comment={comment} key={comment.id} />))
      }
    </div>
  );
}

CommentList.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
    }).isRequired,
  ).isRequired,
};

export default CommentList;
