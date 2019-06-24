import React from 'react';

function Comment(props) {
  return (
    <div>
      <div className="removeComment" onClick={() => props.removeComment(props.articles, props.postIndex, props.commentIndex)}>x</div>
      <cite><h4>{props.name} </h4>{props.email}</cite>
      <blockquote>{props.body}</blockquote>
    </div>
  );
}

export default Comment;
