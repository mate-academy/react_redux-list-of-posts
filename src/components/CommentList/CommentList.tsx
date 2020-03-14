import React, { FC } from 'react';
import { Comment } from '../Comment/Comment';
import { CommentInterface } from '../../constants';

interface Props {
  comments: CommentInterface[];
}

export const CommentList: FC<Props> = (props) => {
  const { comments } = props;

  return (
    <div className="commentList">
      <div className="comments">
        {
          comments.map(comment => (
            <Comment key={comment.id} comment={comment} />
          ))
        }
      </div>
    </div>
  );
};
