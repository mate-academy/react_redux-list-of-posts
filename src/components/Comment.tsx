import React, { FC } from 'react';
import { connect } from 'react-redux';
import { setDeleteComment } from '../redux/actions';

interface Props {
  comment: CommentInterface;
  deleteComment: (id: number) => void;
}

const CommentTemplate: FC<Props> = ({ comment, deleteComment }) => {
  const {
    name,
    email,
    body,
    id,
  } = comment;

  return (
    <>
      <button type="button" onClick={() => deleteComment(id)}>X</button>
      <h5 className="comment__name">{name}</h5>
      <p className="comment__body">{body}</p>
      <p className="comment__email">{email}</p>
    </>
  );
};

const mapDispatchToProps = {
  deleteComment: setDeleteComment,
};

export const Comment = connect(
  null, mapDispatchToProps,
)(CommentTemplate);
