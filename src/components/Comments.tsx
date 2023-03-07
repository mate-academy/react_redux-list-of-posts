import React from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { removeComment } from '../app/thunks';
import { cancelComment } from '../features/commentsSlice';

export const Comments: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    items: comments,
  } = useAppSelector(state => state.comments);

  return (
    <>
      <p className="title is-4">Comments:</p>

      {comments.map(comment => (
        <article
          className="message is-small"
          key={comment.id}
          data-cy="Comment"
        >
          <div className="message-header">
            <a href={`mailto:${comment.email}`} data-cy="CommentAuthor">
              {comment.name}
            </a>

            <button
              data-cy="CommentDelete"
              type="button"
              className="delete is-small"
              aria-label="delete"
              onClick={() => {
                dispatch(cancelComment(comment.id));
                dispatch(removeComment(comment.id));
              }}
            >
              delete button
            </button>
          </div>

          <div className="message-body" data-cy="CommentBody">
            {comment.body}
          </div>
        </article>
      ))}
    </>
  );
};
