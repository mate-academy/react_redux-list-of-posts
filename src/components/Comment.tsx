import React from 'react'
import { deleteComment } from '../store/posts';
import { useDispatch } from 'react-redux';

export const Comment = ({ name, body, email, id, postId }: Comment) => {
  const dispatch = useDispatch();

  return (
    <li className="post__comment comment">
      <p className="comment__name">
        {name}
      </p>
      <p className="comment__body">
        {body}
      </p>
      <a href={`mailto:${email}`} className="comment__email">
        {email}
      </a>
      <button
        onClick={() => dispatch(deleteComment(postId, id))}
        type="button"
        className="comment__delete-comment-btn btn-floating cyan"
      >
        X
      </button>
    </li>
  )
}
