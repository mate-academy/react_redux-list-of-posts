import React, { FC } from 'react';
import { useDispatch } from 'react-redux';

import { Comment as CommentComponent } from '../Comment';

import { Comment } from '../../constants/types';
import { deleteComment } from '../../store/actions';


interface Props {
  comments: Comment[];
}

export const CommentList: FC<Props> = (props) => {
  const { comments } = props;

  const dispatch = useDispatch();

  return (
    <ol>
      {comments.map(comment => (
        <li key={comment.id}>
          <CommentComponent comment={comment} />
          {' '}
          <button
            type="button"
            onClick={() => {
              dispatch(deleteComment(comment.postId, comment.id));
            }}
          >
            X
          </button>
        </li>
      ))}
    </ol>
  );
};
