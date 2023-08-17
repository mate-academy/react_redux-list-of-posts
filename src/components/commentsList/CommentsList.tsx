import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import * as commentsActions from '../../features/comments/comentsSlice';
import { Comment } from '../../types/Comment';

export const CommentsList: React.FC = () => {
  const comments = useAppSelector(state => state.coments.items);
  const dispatch = useAppDispatch();

  const deleteComment = (comment: Comment) => {
    dispatch(commentsActions.removeComment(comment));
    dispatch(commentsActions.removeFromServer(comment));
  };

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
              onClick={() => deleteComment(comment)}
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
