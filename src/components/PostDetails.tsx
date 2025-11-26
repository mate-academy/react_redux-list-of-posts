import { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectSelectedPosts } from '../features/slices/postsSlice';
import {
  errorComment,
  fetchDeleteComment,
  fetchPostComments,
  loadingComment,
  selectComments,
} from '../features/slices/commentsSlice';

export const PostDetails = () => {
  const dispatch = useAppDispatch();
  const comments = useAppSelector(selectComments);
  const loading = useAppSelector(loadingComment);
  const hasError = useAppSelector(errorComment);
  const selectedPost = useAppSelector(selectSelectedPosts);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (selectedPost) {
      dispatch(fetchPostComments(selectedPost.id));
    }
  }, [dispatch, selectedPost]);

  const handleDeleteComment = (commentId: number) =>
    dispatch(fetchDeleteComment(commentId));

  const handleCommentAdded = () => {
    setVisible(false);
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${selectedPost?.id}: ${selectedPost?.title}`}</h2>

        <p data-cy="PostBody">{selectedPost?.body}</p>
      </div>

      <div className="block">
        {loading && <Loader />}

        {!loading && hasError !== null && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {!loading && hasError === null && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {!loading && hasError === null && comments.length > 0 && (
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
                    onClick={() => handleDeleteComment(comment.id)}
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

        {!loading && hasError === null && !visible && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setVisible(true)}
          >
            Write a comment
          </button>
        )}

        {!loading && hasError === null && visible && (
          <NewCommentForm handleCommentAdded={handleCommentAdded} />
        )}
      </div>
    </div>
  );
};
