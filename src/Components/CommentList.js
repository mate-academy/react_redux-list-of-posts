import React from 'react';
import '../styles/CommentList.css';
import CommentHandler from './CommentHandler';
import '../styles/CommentList.css';

function CommentList(props) {
  return (
    <div className="comments">
      {props.comments.map(comment => <CommentHandler comment={comment} key={comment.id} />)}
    </div>
  );
}

export default CommentList;
