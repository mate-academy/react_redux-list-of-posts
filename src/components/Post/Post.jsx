import React from 'react';
import './Post.scss';
import User from '../User/User';
import CommentsList from '../CommentsList/CommentsList';

function Post({ post, deletePostFromList }) {
  const { user, comments } = post;
  return (
    <div
      className="d-flex flex-column
        border-3 border-warning
        rounded
        p-3 m-3"
    >
      <button
        className="btn btn-danger align-self-end m-3"
        type="button"
        onClick={deletePostFromList}
      >
        X
      </button>
      <User user={user} />
      <h2 className="post__name">{`Title: ${post.title}`}</h2>
      <p className="post__body">{`Body: ${post.body}`}</p>
      <CommentsList comments={comments} />
    </div>
  );
}

export default Post;
