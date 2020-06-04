import React from 'react';
import './Comments.css';
import { useDispatch } from 'react-redux';
import { capitalize } from '../../helpers/capitalize';
import { removeComment } from '../../store/posts';

type Props = {
  comment: Comment;
};

const Comments: React.FC<Props> = ({ comment }) => {
  const {
    id, name, email, body, postId,
  } = comment;
  const dispatch = useDispatch();

  return (
    <div className="comments__item">
      <button
        type="button"
        onClick={() => dispatch(removeComment(postId, id))}
      >
        X
      </button>

      <p className="author">
        {capitalize(name)}
        <a href="mailto:example@gmail.com" className="author__email">{email}</a>
      </p>
      <p>
        {capitalize(body)}
      </p>
    </div>
  );
};

export default Comments;
