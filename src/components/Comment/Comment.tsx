import React from 'react';
import { useDispatch } from 'react-redux';
import { CommentProps } from '../../helpers/types';
import { deleteComment } from '../../store/index';

export const Comment: React.FC<CommentProps> = ({ comment }) => {
  const dispatch = useDispatch();
  const deleteCurrentComment = (id: number, commentId: number) => (
    dispatch(deleteComment(id, commentId))
  );

  return (
    <>
      <button
        onClick={() => deleteCurrentComment(comment.postId, comment.id)}
        type="button"
        className="close"
        aria-label="Close"
      >
        <span aria-hidden="true">&times;</span>
      </button>
      <b>{comment.name}</b>
      <p>{comment.body}</p>
      <i><span>{comment.email}</span></i>
    </>

  );
};
