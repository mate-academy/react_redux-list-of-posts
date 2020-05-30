import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteComment } from '../../store';

interface Props {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

export const CommentItem: React.FC<Props> = ({
  id,
  postId,
  name,
  email,
  body,
}) => {
  const dispatch = useDispatch();

  return (
    <div className="comment box is-italic is-margin-vertical" id={`${postId}-${id}`}>
      <strong>{name}</strong>
      {' '}
      <small>{email}</small>
      <p>
        {body}
      </p>
      <button
        type="button"
        className="button is-danger is-rounded comment__hidden-button"
        onClick={() => dispatch(deleteComment(id))}
      >
        x
      </button>
    </div>
  )
};
