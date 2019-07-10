import React from 'react';
import User from '../userComponent/User';
import './post.css';
import CommentListHandler from '../commensComponent/CommentListHandler';

export default function Post(props) {
  return (
      <article>
        <section className="bodyPost">
          <h1 className="titlePost">{props.post.title}</h1>
          <p className="textPost">{props.post.body}</p>
        </section>
        <User user={props.post.user}/>
        <span className="remove" onClick={() => props.remove(props.post.id)}>&times;</span>
        <CommentListHandler commentList={props.commentList}/>
      </article>
  )
}
