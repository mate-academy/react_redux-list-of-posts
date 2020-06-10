import React from 'react';
import { Comment } from './Comment';

type Props = {
  comments: CommentType[];
};

export const CommentList: React.FC<Props> = ({ comments }) => (
  <>
    <ul className="comments">
      {comments.map(review => (
        <Comment
          key={review.id}
          comment={review}
        />
      ))}
    </ul>
  </>
);
