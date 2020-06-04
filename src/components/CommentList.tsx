import React from 'react';
import { useDispatch } from 'react-redux';
import { removeComment } from '../store/post';

type Props = {
  comment: Comment;
};

export const CommentsList: React.FC<Props> = ({ comment }) => {
  const {
    name,
    body,
    email,
    postId,
  } = comment;
  const dispatch = useDispatch();

  return (
    <div>
      <button
        className="btn btn-warning"
        type="button"
        onClick={() => dispatch(removeComment(postId, comment.id))}
      >
        x
      </button>
      <h3>
        {name}
      </h3>
      <p>
        <a href={`mailto:${email}`}>
          {email}
        </a>
      </p>
      <p>
        {body}
      </p>
    </div>
  );
};
