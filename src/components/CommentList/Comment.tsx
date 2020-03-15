import React, { FC } from 'react';
import { connect } from 'react-redux';
import { removeComment as removeCommentStore } from '../../store';
import './Comment.css';

interface Props {
  comment: Comment;
}

interface DispatchProps {
  removeComment: (value: number) => void;
}

const CommentTemplate: FC<Props & DispatchProps> = ({ comment, removeComment }) => {
  return (
    <div className="comment">
      <button
        type="button"
        className="destroy destroy-comment"
        aria-label="Delete"
        data-name={comment.id}
        onClick={() => removeComment(comment.id)}
      />
      <h3 className="comment__name">{comment.name}</h3>
      <p className="comment__email">{comment.email}</p>
      <p className="comment__text">{comment.body}</p>
    </div>
  );
};

const mapDispatchToProps = {
  removeComment: removeCommentStore,
};

export const Comment = connect<{}, DispatchProps, Props, State>(
  null, mapDispatchToProps,
)(CommentTemplate);
