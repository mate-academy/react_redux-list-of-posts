import React from 'react';
import { useDispatch } from 'react-redux';
import { CommentCard } from './CommentCard';
import { deletePost } from '../store/posts';


export const PostCard = ({
  title, user, body, commentList, id,
}: Post) => {
  const dispatch = useDispatch();

  const deletePosts = (idx: number) => {
    dispatch(deletePost(idx));
  };

  return (
    <div className="blog-post">
      <h3>{title}</h3>
      <button
        onClick={() => deletePosts(id)}
        type="button"
        className="btn btn-warning"
      >
        Delete this post
      </button>
      <p className="user text-primary">{user ? user.name : 'Unknown'}</p>
      <p className="blog-body">{body}</p>
      <div className="comment-list">
        {commentList ? (commentList.map(comment => (
          <CommentCard key={comment.id} {...comment} />
        ))
        ) : null}
      </div>
    </div>
  );
};
