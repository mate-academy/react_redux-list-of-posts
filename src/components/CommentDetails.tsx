import React from 'react';
import { useAppDispatch } from '../app/hooks';
import { deletePostComment } from '../features/postComments';

type Props = { comment: Comment };

export const CommentDetails: React.FC<Props> = ({ comment }) => {
  const dispatch = useAppDispatch();

  return (
    <article className="message is-small" key={comment.id} data-cy="Comment">
      <div className="message-header">
        <a href={`mailto:${comment.email}`} data-cy="CommentAuthor">
          {comment.name}
        </a>

        <button
          data-cy="CommentDelete"
          type="button"
          className="delete is-small"
          aria-label="delete"
          onClick={() => dispatch(deletePostComment(comment.id))}
        >
          delete button
        </button>
      </div>

      <div className="message-body" data-cy="CommentBody">
        {comment.body}
      </div>
    </article>
  );
};
