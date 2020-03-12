import React, { FC, useState } from 'react';
import { Comment } from '../Comment/Comment';
import { CommentInterface } from '../../constants/types';

interface Props {
  comments: CommentInterface[];
}

export const CommentList: FC<Props> = (props) => {
  const [visibleComments, setVisibleComments] = useState<CommentInterface[]>(props.comments);

  const deleteComment = (id: number) => {
    setVisibleComments([...visibleComments].filter(item => item.id !== id));
  };

  return (
    <div className="commentList">
      <div className="comments">
        {
          visibleComments.map(comment => (
            <Comment key={comment.id} comment={comment} handleDelete={deleteComment} />
          ))
        }
      </div>
    </div>
  );
};
