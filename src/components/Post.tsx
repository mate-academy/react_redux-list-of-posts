import React from 'react';
import { User } from './User';
import { CommentsList } from './CommentsList';
import { deletePost } from '../store/posts';
import { useDispatch } from 'react-redux';

export const Post = ({
  title,
  body,
  user,
  comments,
  id,
}: Post) => {
  const dispatch = useDispatch();
  return (
    <article className="post">
      <h2 className="post__title">
        {title}
      </h2>
      <p className="post__body">
        {body}
      </p>
      <User {...user} />
      <h6>Comments:</h6>
      <button
        type="button"
        onClick={() => dispatch(deletePost(id))}
        className="post__delete-btn btn-floating red btn-small"
      >
        <i className="material-icons">delete</i>
      </button>
      <CommentsList comments={comments} postId={id}/>
    </article>
  )
};
