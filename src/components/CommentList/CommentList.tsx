import React, {FC} from 'react';
import {CommentItem} from '../CommentItem/CommentItem';

interface CommentListProps {
  comments: Comment[];
}

export const CommentList: FC<CommentListProps> = ({ comments }) => {
  return (
    <div className="post-item-comments-container">
      {
        comments.map(comment => (
          <CommentItem key={comment.id} comment={comment} />
        ))
      }
    </div>
  )
};
