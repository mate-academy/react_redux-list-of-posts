import React from 'react';

function Comment(props) {
  return (
    <div className="comment">
      <span className={props.search ? "post-cross-none" :"comment-cross"} onClick={() => props.removeComment(props.index, props.posts, props.postIndex)}>&times;</span>
      <h4 className="comment-title">{props.comment.name}</h4>
      <a href={'mailto:' + props.comment.email} title="click to mail">{props.comment.email}</a>
      <p>{props.comment.body}</p>
    </div>
  );
}

export default Comment;
