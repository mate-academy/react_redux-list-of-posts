import React from 'react';

function Comment({ comment }) {
  return (
    <>
      <h4><i>{comment.name}</i></h4>
      <p>{comment.body}</p>
    </>
  );
}

export default Comment;
