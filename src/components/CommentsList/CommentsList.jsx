import React from 'react';
import './CommentsList.scss';
import Comment from '../../containers/CommentHandler';

function CommentsList({ comments }) {
  return (
    <div className="comments">
      {comments.map(comment => <Comment key={comment.id} comment={comment} />)}
    </div>
  );
}

export default CommentsList;
