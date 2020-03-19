import React, { FC } from 'react';

import './CommentItem.css';

interface CommentItemProps {
  comment: Comment;
}

export const CommentItem: FC<CommentItemProps> = ({ comment }) => {
  return (
    <div className="notification comment-item box is-warning">
      <p className="comment-item-name">{ comment.name }</p>
      <p>{ comment.body }</p>
      <p className="comment-item-email">{ comment.email }</p>
    </div>
  );
};
