import React from 'react';
import Comment from '../Comment/Comment';

type Props = {
  comments: Comment[];
};

const CommentList: React.FC<Props> = ({ comments }) => (
  <div className="comments">
    <h2>Comments</h2>
    {comments.map(comment => (
      <Comment
        comment={comment}
        key={comment.id}
      />
    ))}
  </div>
);

export default CommentList;
