import React from 'react';
import { useDispatch } from 'react-redux';
import './Comment.scss';
import { deleteComment } from './store/index';

const Comment: React.FC<Comment> = ({
  name, body, id, email,
}) => {
  const dispatch = useDispatch();

  return (
    <div className="comment">
      <button
        type="button"
        className="button__delete"
        onClick={() => dispatch(deleteComment(id))}
      >
        Delete
      </button>
      <p className="comment__name">
        {name}
      </p>
      <p className="comment__text">
        {body}
      </p>
      <p className="comment__email">
        <a href={`mailto:${email}`}>
          {email}
        </a>
      </p>
    </div>
  );
};

export default Comment;
