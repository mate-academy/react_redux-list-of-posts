import React from 'react';
import { useSelector } from 'react-redux';

import './CommentList.scss';
import { CommentItem } from './CommentItem';
import { getComments } from '../../store';

interface Props {
  postId: number;
}

export const CommentList: React.FC<Props> = ({ postId }) => {
  const comments: Comment[] = useSelector(getComments);
  const postComments = [...comments].filter(comment => comment.postId === postId);

  return (
    <ul>
      {postComments.map((comment) => (
        <li key={comment.id}>
          <CommentItem {...comment} />
        </li>
      ))}
    </ul>
  );
};
