import React from 'react';
import User from './User';
import CommentList from './CommentList';
import '../css/Post.css';

function Post(props) {
  return (
    <div className="post">
      <h2>{props.post.title}
        <span className='del' onClick={() => props.deletePost(props.post.id)}>&times;</span>
      </h2>
      <p>{props.post.body}</p>
      <section>
        <User user = {props.post.user}/>
      </section>
      <section className="comments_block">
        <CommentList comments={props.post.comments}/>
      </section>
    </div>
  );
}

export default Post;
