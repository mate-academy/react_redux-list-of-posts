import React from 'react';
import CommentHandler from './CommentHandler';

function CommentList(props) {
  return (
    <React.Fragment>
      <h3>Comments</h3>
      <section className="comments">
        {props.comments.map(comment => <CommentHandler
          key = {comment.body} 
          comment={comment}
        />)}
      </section>
    </React.Fragment>
  );
}

export default CommentList;
