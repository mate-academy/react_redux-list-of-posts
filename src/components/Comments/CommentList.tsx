import React from 'react';

import './CommentList.scss';
import { CommentItem } from './CommentItem';

interface Props {
  comments: Comment[];
}

export const CommentList: React.FC<Props> = ({ comments }) => {
  return (
    <ul>
      {comments.map((comment) => (
        <li key={comment.id}>
          <CommentItem {...comment} />
        </li>
      ))}
    </ul>
  );
};
