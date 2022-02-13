import React from 'react';
import { Comment } from './Comment';

type CommentsProps = Comments & {
  postId: number;
}

export const CommentsList = ({ comments, postId }: CommentsProps) => {
  return (
    <ul className="post__comments">
      {comments.map(currentComment => (
        <Comment
          {...currentComment}
          key={currentComment.id}
          postId={postId}
        />
      ))}
    </ul>
  )
}
