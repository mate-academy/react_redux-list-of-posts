import React from 'react';
import { useAppDispatch } from '../../app/hooks';
import { deleteCommentAsync } from '../../features/comments/commentsSlice';
import { Comment } from '../../types/Comment';
import { Loader } from '../Loader';

type Props = {
  comments: Comment[],
  loaded: boolean,
  hasError: boolean,
};

export const CommentsList: React.FC<Props> = ({
  comments,
  loaded,
  hasError,
}) => {
  const dispatch = useAppDispatch();

  const deleteComment = (commentId: number) => {
    dispatch(deleteCommentAsync(commentId));
  };

  if (!loaded) {
    return <Loader />;
  }

  if (hasError) {
    return (
      <div className="notification is-danger" data-cy="CommentsError">
        Something went wrong
      </div>
    );
  }

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
