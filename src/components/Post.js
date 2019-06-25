import React from 'react';
import User from './User';
import CommentList from './CommentList';
import './Post.css';

function Post(props) {
  const { title, body, user, postComments } = props;
  return (
    <div>
      <h1>{title}</h1>
      <button className='delete' onClick={() => props.postRemoveClicked(props.id)}>DELETE POST</button>
      <span className='post-body'>{body}</span>
      <User {...user}/>
      <CommentList postComments={postComments} />
      <hr/>
    </div>
  );
}

export default Post;
