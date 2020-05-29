import React from 'react';
import { deleteComment } from '../store/posts';
import { useDispatch } from 'react-redux';

export const CommentList = ({ comments, postId }: CommentsProps) => {
  const dispatch = useDispatch();
  return (
    <>
      {comments.map(({
                       id, name, body, email,
                     }) => (
        <section className="post__comment" key={id}>
          <span
            className="comment__delete"
            onClick={() => dispatch(deleteComment(postId, id))}
          >
            Delete comment
          </span>
          <p className="comment__name">{name}</p>
          <p className="comment__body">{body}</p>
          <a href={`mailto:${email}`} className="comment__email">
            {email}
          </a>
        </section>
      ))}
    </>
  );
}
