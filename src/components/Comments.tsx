import { useAppDispatch, useAppSelector } from '../app/hooks';
import { removeComment } from '../features/commentsSlice';

export const Comments = () => {
  const comments = useAppSelector(state => state.comments.items);
  const dispatch = useAppDispatch();

  if (!comments.length) {
    return (
      <p className="title is-4" data-cy="NoCommentsMessage">
        No comments yet
      </p>
    );
  }

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
              onClick={() => dispatch(removeComment(comment.id))}
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
