import React, { FC } from 'react';
import { connect } from 'react-redux';
import { CommentInterface } from '../../types';
import { deleteComment } from '../../redux/actionCreators';

import './Comment.css';

interface Props {
  comment: CommentInterface;
  removeComment: (id: number) => void;
}

export const CommentTemplate: FC<Props> = ({ comment, removeComment }) => {
  const {
    name,
    email,
    body,
    id,
  } = comment;

  return (
    <li className="сomment">
      <button
        type="button"
        className="delete_button delete_button-comment"
        onClick={() => removeComment(id)}
      >
        Delete
      </button>
      <span className="сomment__name">{`${name} (${email})`}</span>
      <p className="сomment__body">{body}</p>
    </li>
  );
};

const mapDispatchToProps = ({
  removeComment: deleteComment,
});

export const Comment = connect(
  null,
  mapDispatchToProps,
)(CommentTemplate);
