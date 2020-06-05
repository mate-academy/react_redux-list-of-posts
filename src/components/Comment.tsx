import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteComment } from '../store/posts';

export const Comment = ({ name, email, body, id }: Comment) => {
  const dispatch = useDispatch();

  return (
    <li className="guest">
      <button
        className="quest_delete-btn"
        type="button"
        onClick={() => dispatch(deleteComment(id))}
      />
      
      <p className="guest_name">{name}</p>
      <p>{body}</p>
      <p>
        <a className="guest_email" href={`mailto:${email}`}>
          {email}
        </a>
      </p>
    </li>
  );
}
