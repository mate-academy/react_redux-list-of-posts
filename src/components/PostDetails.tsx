import { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { useAppDispatch, useAppSelector } from '../app/hooks';

import {
  errorComment,
  fetchDeleteComment,
  fetchPostComments,
  loadingComment,
  selectComments,
} from '../features/slices/commentsSlice';
import { selectSelectedPost } from '../features/slices/selectedPostSlice';

export const PostDetails = () => {
  const dispatch = useAppDispatch();
  const comments = useAppSelector(selectComments);
  const loaded = useAppSelector(loadingComment);
  const hasError = useAppSelector(errorComment);
  const selectedPost = useAppSelector(selectSelectedPost);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (selectedPost) {
      dispatch(fetchPostComments(selectedPost.id));
    }

    setVisible(false);
  }, [dispatch, selectedPost]);

  const handleDeleteComment = (commentId: number) =>
    dispatch(fetchDeleteComment(commentId));

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${selectedPost?.id}: ${selectedPost?.title}`}</h2>

        <p data-cy="PostBody">{selectedPost?.body}</p>
      </div>

      <div className="block">
        {loaded && <Loader />}

        {!loaded && hasError !== null && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {!loaded && hasError === null && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {!loaded && hasError === null && comments.length > 0 && (
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

        {!loaded && hasError === null && !visible && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setVisible(true)}
          >
            Write a comment
          </button>
        )}

        {!loaded && hasError === null && visible && <NewCommentForm />}
      </div>
    </div>
  );
};
