import React from 'react';
import Comment from './Comment';

type Props = {
  comments: Comment[];
};

const CommentsList: React.FunctionComponent<Props> = ({ comments }) => {
  return (
    <section className="post__comments-section">
      <h3 className="post__comments-title">{comments.length === 0 ? 'No Comments Yet' : 'Comments'}</h3>
      {comments.map((commentItem) => (
        <Comment comment={commentItem} key={commentItem.id} />
      ))}
    </section>
  );
};

export default CommentsList;
