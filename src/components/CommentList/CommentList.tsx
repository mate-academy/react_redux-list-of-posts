import React, { FC } from 'react';
import { Comment } from '../Comment/Comment';

interface Props {
  postID: number;
  comments: Comment[];
  onDelete: (postId: number, commentId: number) => void;
}

export const CommentList: FC<Props> = ({ comments, postID, onDelete }) => {
  return (
    <ul className="commentList">
      {comments.map(item => (
        <Comment
          key={item.id}
          comment={item}
          postID={postID}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
};
