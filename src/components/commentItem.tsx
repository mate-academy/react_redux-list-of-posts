import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteComment } from './post';

type Props = {
  comment: CommentProps;
  postId: number;
};

const CommentItem: React.FC<Props> = ({ comment, postId }) => {
  const dispatch = useDispatch();
  const { name, body, email } = comment;

  return (
    <>
      <div className="comment__item">
        <p className="comment__name">
          Сomment author:&nbsp;
          {name}
        </p>
        <p className="comment__body">{body}</p>
        <a href={`mailto:${email}`} className="comment__email">
          Email:&nbsp;
          {email}
        </a>
        <button
          className="delete-button"
          type="button"
          onClick={() => dispatch(deleteComment(postId, comment.id))}
        >
          x
        </button>
      </div>
    </>
  );
};

export default CommentItem;
