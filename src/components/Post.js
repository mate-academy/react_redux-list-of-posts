import React from 'react';
import User from './User';
import CommentList from './CommentList';

function Post(props) {
  return (
    <div className="post">
      <span className="post-cross" title="click to remove post" onClick={() => props.removePost(props.index, props.posts)}>&times;</span>
      <h2 className="post-title">{props.title}</h2>
      <User user={props.user}/>
      <p className="post-body">{props.body}</p>
      <CommentList comments={props.comments} postIndex={props.index}/>
    </div>
  );
}

export default Post;
