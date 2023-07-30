import { useEffect } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  clearValue,
  deleteFromServerPost,
  getFromServerCommnets,
  disForm,
  activeForm,
} from '../features/commentsAPI';
import { takeSelectPost, selectComment } from '../app/store';

export const PostDetails = () => {
  const { comments, status, hasForm } = useAppSelector(selectComment);
  const { selectPost } = useAppSelector(takeSelectPost);
  const dispatch = useAppDispatch();

  const removeComment = (id: number) => {
    dispatch(deleteFromServerPost(id));
  };

  useEffect(() => {
    if (selectPost) {
      dispatch(getFromServerCommnets(selectPost.id));
      dispatch(clearValue());
      dispatch(disForm());
    }
  }, [selectPost]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">
          {`#${selectPost?.id}: ${selectPost?.title}`}
        </h2>

        <p data-cy="PostBody">
          {selectPost?.body}
        </p>
      </div>

      <div className="block">
        {status === 'loading' && (
          <Loader />
        )}

        {status === 'failed' && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {status === 'idle' && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {status === 'idle' && comments.length > 0 && (
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
                    onClick={() => removeComment(comment.id)}
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

        {status === 'idle' && !hasForm && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => dispatch(activeForm())}
          >
            Write a comment
          </button>
        )}

        {status === 'idle' && hasForm && (
          <NewCommentForm />
        )}
      </div>
    </div>
  );
};
