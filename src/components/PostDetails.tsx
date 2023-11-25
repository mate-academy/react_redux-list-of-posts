import { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import * as commentsActions from '../features/comments/commentS';
import { useAppDispatch, useAppSelector } from '../app/hooks';

export const PostDetails = () => {
  const [visible, setVisible] = useState(false);

  const dispatch = useAppDispatch();
  const { posT } = useAppSelector(state => state.posts);
  const { comments, loading, error } = useAppSelector(state => state.comments);

  useEffect(() => {
    setVisible(false);

    if (posT) {
      dispatch(commentsActions.initComments(posT.id));
    }
  }, [posT?.id]);

  const deleteComment = (commentId: number) => {
    dispatch(commentsActions.removeComment(commentId));
    dispatch(commentsActions.initRemoveComment(commentId));
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">
          {`#${posT?.id}: ${posT?.title}`}
        </h2>

        <p data-cy="PostBody">
          {posT?.body}
        </p>
      </div>

      <div className="block">
        {loading && (
          <Loader />
        )}

        {!loading && error && (
          <div className="notification is-danger" data-cy="CommentsError">
            {error}
          </div>
        )}

        {!loading && !error && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {!loading && !error && !!comments.length && (
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
        )}

        {!loading && !error && !visible && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setVisible(true)}
          >
            Write a comment
          </button>
        )}

        {!loading && !error && visible && (
          <NewCommentForm />
        )}
      </div>
    </div>
  );
};
