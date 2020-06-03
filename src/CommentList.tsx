import React from 'react';
import CommentItem from './CommentItem';

type Props = {
  comments: CommentProps[];
  postId: number;
};

const CommentList: React.FC<Props> = ({ comments, postId }) => (
  <article className="comments">
    Comments:&nbsp;
    {comments.map((comment: CommentProps) => (
      <CommentItem comment={comment} key={comment.id} postId={postId} />
    ))}
  </article>
);

export default CommentList;
