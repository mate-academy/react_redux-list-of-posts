import {
  useAppDispatch,
  useAppSelector,
} from '../app/hooks';
import {
  removeComment,
  selectComments,
  setComments,
} from '../features/comments/commentsSlice';

export const Comments = () => {
  const dispatch = useAppDispatch();
  const comments = useAppSelector(selectComments);

  const deleteComment = async (commentId: number) => {
    dispatch(setComments(comments.filter(item => item.id !== commentId)));
    dispatch(removeComment(commentId));
  };

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
              onClick={() => deleteComment(comment.id)}
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
