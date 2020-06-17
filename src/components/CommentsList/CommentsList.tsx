import React from 'react';

import { CommentCard } from '../CommentCard/CommentCard';

type Props = {
  commentsList: Comment[];
};

export const CommentsList: React.FC<Props> = ({ commentsList }) => (
  <ul>
    {commentsList.map((comment: Comment) => (
      <CommentCard {...comment} key={comment.id} />
    ))}
  </ul>
);
