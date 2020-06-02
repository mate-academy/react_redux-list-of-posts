import React from 'react';

import Comment from './Comment';

type Props = {
  comments: Comment[];
};

const CommentsList: React.FC<Props> = ({ comments }) => {
  return (
    <div className="app__comments">
      <span className="app__comments-title">
        Comments:
      </span>
      <ul className="app__comments-list">
        {comments.map(comment => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </ul>
    </div>
  );
};

export default CommentsList;
