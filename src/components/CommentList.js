import React from 'react';
import CommentHandler from './CommentHandler';

function CommentList(props) {
  return (
    <div className="comments">
      {props.comments.map(commentItem =>
        <CommentHandler comment={commentItem} postIndex={props.postIndex} key={commentItem.id} />)
      }
    </div>
  );
}

export default CommentList;
