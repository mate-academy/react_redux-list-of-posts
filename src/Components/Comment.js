import React from 'react';
import '../styles/Comment.css';

function Comment(props) {
  const { title, body, email, id, removeComment } = props;

  return (
    <div key={title} className="comment">
      <div className="title">
        <h4>{title}</h4>
        <button className="remove" onClick={() => removeComment(id)}>&times;</button>
      </div>
      <p>{body}</p>
      <a href={"mailto:" + email}>{email}</a>
    </div>
  );
}

export default Comment;
