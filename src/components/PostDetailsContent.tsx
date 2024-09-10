/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  deleteCommentAsync,
  loadCommentsAsync,
} from '../features/commentsSlice';

export const PostDetailsContent = () => {
  const [visible, setVisible] = useState(false);
  const post = useAppSelector(state => state.selectedPost);
  const { comments, isLoading, hasError } = useAppSelector(
    state => state.comments,
  );

  const dispatch = useAppDispatch();

  function loadComments() {
    setVisible(false);
    if (post) {
      dispatch(loadCommentsAsync(post.id));
    }
  }

  useEffect(loadComments, [post?.id]);

  const deleteComment = async (commentId: number) => {
    dispatch(deleteCommentAsync(commentId));
  };

  if (isLoading) {
    return <Loader />;
  }

  if (hasError) {
    return (
      <div className="notification is-danger" data-cy="CommentsError">
        Something went wrong
      </div>
    );
  }

  return (
    <>
      {!comments.length ? (
        <p className="title is-4" data-cy="NoCommentsMessage">
          No comments yet
        </p>
      ) : (
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
                ></button>
              </div>

              <div className="message-body" data-cy="CommentBody">
                {comment.body}
              </div>
            </article>
          ))}
        </>
      )}

      {!visible && (
        <button
          data-cy="WriteCommentButton"
          type="button"
          className="button is-link"
          onClick={() => setVisible(true)}
        >
          Write a comment
        </button>
      )}

      {visible && <NewCommentForm />}
    </>
  );
};
