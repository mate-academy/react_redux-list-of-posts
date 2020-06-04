import React from 'react';
import { useDispatch } from 'react-redux';
import { removeComment } from '../store/posts';

type Props = {
  comment: Comment;
};

export const Comment: React.FC<Props> = ({ comment }) => {
  const { name, body, email } = comment;
  const dispatch = useDispatch();

  return (
    <div className="post__comment">
      <p>{name}</p>
      <p>{body}</p>
      <p>{email}</p>
      <button
        type="button"
        className="button"
        onClick={() => dispatch(removeComment(comment.id))}
      >Remove</button>
    </div>
  );
};
