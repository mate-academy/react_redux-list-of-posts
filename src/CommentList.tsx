import React from 'react';
import Comment from './Comment';

type Props = {
  comments: CommentProps[];
  postId: number;
};

const CommentList: React.FC<Props> = ({ comments, postId }) => (
  <article className="comments">
    Comments:&nbsp;
    {comments.map((comment: CommentProps) => (
      <Comment comment={comment} key={comment.id} postId={postId} />
    ))}
  </article>
);

export default CommentList;
