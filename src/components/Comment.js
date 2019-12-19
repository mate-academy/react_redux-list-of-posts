import React from 'react';

function Comment(props) {
  return (
    <section>
      <p>{props.text}</p>
      <p>{props.author}</p>
      <p>
        <a href="#">{props.email}</a>
        <span className='del' 
          onClick={() => 
            props.deleteComment(props.comment.id, props.comment.postId )}>
            &times;
        </span>
      </p>
    </section>
  );
}

export default Comment;
