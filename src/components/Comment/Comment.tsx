import React, { FC } from 'react';
import { connect } from 'react-redux';
import { CommentType } from '../../utils/interfaces';
import './Comment.css';
import { removeComment as deleteComment } from '../../store/actionCreators';

interface Props {
  comment: CommentType;
  removeComment: (id: string | number, postId: number) => void;
}

export const CommentTemplate: FC<Props> = ({ comment, removeComment }) => {
  const {
    name,
    body,
    email,
    id,
    postId,
  } = comment;

  return (
    <>
      <button type="button" onClick={() => removeComment(id, postId)}>X</button>
      <h3 className="comment__title">{name}</h3>
      <p className="comment__text">{body}</p>
      <p className="comment__email">{email}</p>
    </>
  );
};

const mapDispatchToProps = {
  removeComment: deleteComment,
};

export const Comment = connect(null, mapDispatchToProps)(CommentTemplate);
