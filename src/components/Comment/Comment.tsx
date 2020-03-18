import React, { FC } from 'react';
import { connect } from 'react-redux';
import { CommentInterface } from '../../constants';
import { deleteComment } from '../../store/actionCreators';

interface Props {
  comment: CommentInterface;
  deleteComment: (value: number) => void;
}

export const CommentTemplate: FC<Props> = (props) => {
  const { deleteComment: deleteCommentProps } = props;
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
        onClick={() => deleteCommentProps(id)}
      >
        Delete comment
      </button>
    </div>
  );
};

const mapDispatchToProps = {
  deleteComment,
};

export const Comment = connect(null, mapDispatchToProps)(CommentTemplate);
