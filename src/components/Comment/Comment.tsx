import React, { FC } from 'react';
import './Comment.css';

interface Props {
  comment: Comment;
  postID: number;
  onDelete: (postId: number, commentId: number) => void;
}

export const Comment: FC<Props> = ({ comment, postID, onDelete }) => {
  const {
    name, email, body, id,
  } = comment;

  return (
    <li className="comment">
      <p className="comment__autor">
        <span>{`autor: ${name} `}</span>
        <span>{`e-mail: ${email}`}</span>
      </p>
      <p className="comment__text">{body}</p>
      <button
        type="button"
        onClick={() => {
          onDelete(postID, id);
        }}
      >
        X
      </button>
    </li>
  );
};
