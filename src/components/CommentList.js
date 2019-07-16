import React from 'react';
import CommentHandler from './CommentHandler';

function CommentList(props) {
  return (
    <div className="comments">
      <p><em>Comments:</em></p>
      {props.comments.map(item => <CommentHandler comment={item} index={item.id} postIndex={props.postIndex} key={item.id}/>)}
    </div>
  );
}

export default CommentList;
