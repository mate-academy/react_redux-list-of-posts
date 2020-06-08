import React from 'react';
import { useDispatch } from 'react-redux';
import { capitalize } from '../../helpers/capitalize';
import { removeComment } from '../../store/posts';
import './Comment.scss';

type Props = {
  comment: Comment;
};

const Comment: React.FC<Props> = ({ comment }) => {
  const {
    id, name, email, body, postId,
  } = comment;
  const dispatch = useDispatch();

  return (
    <div className="Comment">
      <p className="Comment__Name">
        {capitalize(name)}
        <a href="mailto:example@gmail.com" className="Comment__Email">{email}</a>
      </p>
      <p>
        {capitalize(body)}
      </p>
      <button
        type="button"
        onClick={() => dispatch(removeComment(postId, id))}
      >
        Delete
      </button>
    </div>
  );
};

export default Comment;
