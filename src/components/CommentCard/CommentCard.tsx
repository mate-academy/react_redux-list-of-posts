import React from 'react';
import { useDispatch } from 'react-redux';

import './CommentCard.css';
import { RemoveButton } from '../RemoveButton/RemoveButton';
import { removeComment } from '../../store/posts';

type Props = Comment;

export const CommentCard: React.FC<Props> = ({
  name, body, email, id, postId,
}) => {
  const dispatch = useDispatch();

  return (
    <li className="post__comment comment">
      <div className="comment__header">
        <h3 className="comment__title">
          {name}
        </h3>
        <RemoveButton
          size="small"
          onClick={() => dispatch(removeComment(id, postId))}
        />
      </div>
      <p className="comment__text">
        {body}
      </p>
      <span className="comment__email">
        {email}
      </span>
    </li>
  );
};
