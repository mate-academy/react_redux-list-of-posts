import React from 'react';
import './comment.css';

export default function Comment(props) {
  return (
    <div className="comment">
      <span className="remove" onClick={() => props.removeComment(props.comment.id)}>&times;</span>
      <h2>{props.comment.name}</h2>
      <p>{props.comment.email}</p>
      <p>{props.comment.body}</p>
    </div>
  )
}
