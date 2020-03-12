import React, { FC } from 'react';
import { CommentInterface } from '../../constants/types';

interface Props {
  comment: CommentInterface;
  handleDelete: (id: number) => void;
}

export const Comment: FC<Props> = (props) => {
  const {
    name,
    body,
    email,
    id,
  } = props.comment;

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
        onClick={() => props.handleDelete(id)}
      >
        Delete comment
      </button>
    </div>
  );
};
