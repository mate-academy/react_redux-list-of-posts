import React from 'react';
import { Comment } from './Comment';

export const CommentList = ({ comments, postId }: CommentsProps) => {
  return (
    <>
      <p className="comment__heading">Comments</p>
      {comments.map((item) =>
        <Comment key={item.id} {...item} postId={postId} />
        )}
    </>
  );
};
