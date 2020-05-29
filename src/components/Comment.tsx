import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { deleteComment } from '../redux/store/posts';

export const Comment = ({ id, name, body, email, postId }: CommentProps) => {
  const dispatch = useDispatch();
  const handleDeleteComment = useCallback(() => dispatch(deleteComment(postId, id)), [dispatch, postId])

  return (
    <section className="post__comment">
          <span
            className="comment__delete"
            onClick={handleDeleteComment}
          >
            Delete comment
          </span>
      <p className="comment__name">{name}</p>
      <p className="comment__body">{body}</p>
      <a href={`mailto:${email}`} className="comment__email">
        {email}
      </a>
    </section>
  );
}
