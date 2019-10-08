import React from 'react';
import '../styles/Post.css';
import User from './User';
import CommentList from './CommentList';

function Post(props) {
  const { id,
          title,
          body,
          userName,
          userEmail,
          userAddress,
          comments,
          removePost } = props;
  const postCcomments = comments.filter(comment => comment.postId === id);

  return (
    <article key={id} className="post">
      <div className="title">
        <h3>{title}</h3>
        <button className="remove" onClick={() => removePost(id)}>&times;</button>
      </div>
      <User name={userName}
            email={userEmail}
            address={userAddress}
      />
      <p>{body}</p>
      <CommentList comments={postCcomments} />
    </article>
  );
}

export default Post;
