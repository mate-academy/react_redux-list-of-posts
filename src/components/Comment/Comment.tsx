import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteComment } from '../../store/posts';
import './Comment.css';

type Props = {
  comment: Comment;
  postId: number;
};

const Comment: React.FC<Props> = ({
  // лінтер так виставляє Sorry;
  comment: {
    id, name, email, body,
  },
  postId,
}) => {
  const dispatch = useDispatch();

  return (
    <div className="comment">
      <button
        className="btn btn__comment"
        type="button"
        onClick={() => dispatch(deleteComment(postId, id))}
      >
        <i className="fa fa-trash" />

      </button>
      <h5 className="comment__name">{name}</h5>
      <p className="comment__body">{body}</p>
      <p>
        <a href={`mailto:${email}`} className="comment__email">
          {email}
        </a>
      </p>
    </div>

  );
};

export default Comment;
