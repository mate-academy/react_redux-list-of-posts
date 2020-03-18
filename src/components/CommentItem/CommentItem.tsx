import React, {FC} from 'react';

interface CommentItemProps {
  comment: Comment;
}

export const CommentItem: FC<CommentItemProps> = ({ comment }) => {
  return (
    <div className="comment-item">
      <p>{ comment.name }</p>
      <p>{ comment.email }</p>
      <p>{ comment.body }</p>
    </div>
  );
};
