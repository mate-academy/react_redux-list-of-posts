import { useEffect } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  fetchComments,
  setVisible,
  removeCommentFromServer,
} from '../features/commentsSlice';

export const PostDetails = () => {
  const { selectedPost } = useAppSelector((state) => state.posts);
  const selectedPostId = selectedPost?.id || 0;

  const dispatch = useAppDispatch();
  const {
    comments, visible, loaded, hasError,
  } = useAppSelector((state) => state.comments);

  const loadComments = (postId: number) => {
    dispatch(setVisible(false));
    dispatch(fetchComments(postId));
  };

  useEffect(() => {
    loadComments(selectedPostId);
  }, [selectedPostId]);

  const deleteComment = (commentId: number) => {
    dispatch(removeCommentFromServer(commentId));
  };

  return (
    <div
      className="content"
      data-cy="PostDetails"
    >
      <div className="block">
        <h2 data-cy="PostTitle">{`#${selectedPost?.id}: ${selectedPost?.title}`}</h2>

        <p data-cy="PostBody">{selectedPost?.body}</p>
      </div>

      <div className="block">
        {loaded && <Loader />}

        {!loaded && hasError && (
          <div
            className="notification is-danger"
            data-cy="CommentsError"
          >
            Something went wrong
          </div>
        )}

        {!loaded && !hasError && comments.length === 0 && (
          <p
            className="title is-4"
            data-cy="NoCommentsMessage"
          >
            No comments yet
          </p>
        )}

        {!loaded && !hasError && comments.length > 0 && (
          <>
            <p className="title is-4">Comments:</p>

            {comments.map((comment) => (
              <article
                className="message is-small"
                key={comment.id}
                data-cy="Comment"
              >
                <div className="message-header">
                  <a
                    href={`mailto:${comment.email}`}
                    data-cy="CommentAuthor"
                  >
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

                <div
                  className="message-body"
                  data-cy="CommentBody"
                >
                  {comment.body}
                </div>
              </article>
            ))}
          </>
        )}

        {!loaded && !hasError && !visible && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => dispatch(setVisible(true))}
          >
            Write a comment
          </button>
        )}

        {!loaded && !hasError && visible && (
          <NewCommentForm postId={selectedPostId} />
        )}
      </div>
    </div>
  );
};
