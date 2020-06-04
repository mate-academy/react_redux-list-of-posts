import React from 'react';
import Comment from './Comment/Comment';

type Props = {
  userComments?: Comment[];
  postId: number;
};

const CommentList: React.FC<Props> = ({ postId, userComments }) => (
  <div className="comments__container">
    {userComments?.map((comment) => (
      <Comment
        key={comment.id}
        comment={comment}
        postId={postId}
      />
    ))}
  </div>
);

export default CommentList;
