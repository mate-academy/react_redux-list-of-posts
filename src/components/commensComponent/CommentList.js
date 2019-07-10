import React from 'react';
import Comment from './Comment';

export default function CommentList(props) {
  return (
    <section className="commentList">
      <h1>Comments</h1>
      {props.comments.map(comment => {
        return <Comment removeComment={props.removeComment} key={comment.id} comment={comment}/>
      })}
    </section>
  )
}
