import { useAppDispatch, useAppSelector } from '../app/hooks';
import { deletedComment } from '../features/commentsSlice';
import * as commentsApi from '../api/comments';

export const Comments = (() => {
  const { comments } = useAppSelector(
    (state) => state.comments,
  );
  const dispatch = useAppDispatch();

  const deleteComment = async (commentId: number) => {
    // we delete the comment immediately so as
    // not to make the user wait long for the actual deletion

    dispatch({ type: 'comments/deleteComments', payload: commentId });
    dispatch(deletedComment(commentId));

    await commentsApi.deleteComment(commentId);
  };

  return (
    <>
      <p className="title is-4">Comments:</p>

      {comments.map(({
        id,
        email,
        name,
        body,
      }) => (
        <article
          className="message is-small"
          key={id}
          data-cy="Comment"
        >
          <div className="message-header">
            <a href={`mailto:${email}`} data-cy="CommentAuthor">
              {name}
            </a>

            <button
              data-cy="CommentDelete"
              type="button"
              className="delete is-small"
              aria-label="delete"
              onClick={() => deleteComment(id)}
            >
              delete button
            </button>
          </div>

          <div className="message-body" data-cy="CommentBody">
            {body}
          </div>
        </article>
      ))}
    </>
  );
});
