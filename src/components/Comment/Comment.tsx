import React, { FC, useCallback } from 'react';
import { connect } from 'react-redux';
import { deleteCommentThunk } from '../../store/store';
import { CommentInterface } from '../../constants';

interface Props {
  comment: CommentInterface;
  deleteCommentThunk: (value: number) => void;
}

export const CommentTemplate: FC<Props> = (props) => {
  const { deleteCommentThunk: deleteComment } = props;
  const {
    name,
    body,
    email,
    id,
  } = props.comment;

  const handleDelete = useCallback(() => deleteComment(id),
    [id, deleteComment]);


  return (
    <div className="card text-white bg-info mb-3">
      <h3 className="card-header">
        {name}
      </h3>
      <div className="card-body">
        <blockquote className="blockquote mb-0">
          <p>
            {body}
          </p>
          <footer className="blockquote-footer">
            {email}
          </footer>
        </blockquote>
      </div>
      <button
        type="button"
        className="btn btn-light"
        onClick={handleDelete}
      >
        Delete comment
      </button>
    </div>
  );
};

const mapDispatchToProps = {
  deleteCommentThunk,
};

export const Comment = connect(null, mapDispatchToProps)(CommentTemplate);
