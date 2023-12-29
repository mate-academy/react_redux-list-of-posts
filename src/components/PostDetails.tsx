/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

import * as commentsApi from '../api/comments';

import { CommentData } from '../types/Comment';
import { actions as commentsAction } from '../features/comments';
import { useAppDispatch, useAppSelector } from '../app/hooks';

export const PostDetails: React.FC = () => {
  const dispatch = useAppDispatch();
  const { selectedPost } = useAppSelector(state => state.selectedPost);
  const { comments, loading, error } = useAppSelector(state => state.comments);
  const [visible, setVisible] = useState(false);

  const showError = !loading && error;
  const showMessage = !loading && !error && !comments.length;
  const showContent = !loading && !error && !!comments.length;
  const showButton = !loading && !error && !visible;
  const showForm = !loading && !error && visible;

  function loadComments() {
    if (selectedPost) {
      dispatch(commentsAction.setLoading(true));
      dispatch(commentsAction.setError(false));
      setVisible(false);

      commentsApi.getPostComments(selectedPost.id)
        .then(commentsFromServer => {
          dispatch(commentsAction.set(commentsFromServer));
        })
        .catch(() => dispatch(commentsAction.setError(true)))
        .finally(() => dispatch(commentsAction.setLoading(false)));
    }
  }

  useEffect(loadComments, [selectedPost]);

  const addComment = async ({ name, email, body }: CommentData) => {
    try {
      const newComment = await commentsApi.createComment({
        name,
        email,
        body,
        postId: selectedPost?.id || 0,
      });

      dispatch(commentsAction.set([...comments, newComment]));
    } catch (err) {
      dispatch(commentsAction.setError(true));
    }
  };

  const deleteComment = async (commentId: number) => {
    dispatch(commentsAction.set(comments.filter(
      comment => comment.id !== commentId,
    )));

    await commentsApi.deleteComment(commentId);
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        {selectedPost && (
          <>
            <h2 data-cy="PostTitle">
              {`#${selectedPost.id}: ${selectedPost.title}`}
            </h2>

            <p data-cy="PostBody">
              {selectedPost.body}
            </p>
          </>
        )}
      </div>

      <div className="block">
        {loading && (
          <Loader />
        )}

        {showError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {showMessage && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {showContent && (
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

        {showButton && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setVisible(true)}
          >
            Write a comment
          </button>
        )}

        {showForm && (
          <NewCommentForm onSubmit={addComment} />
        )}
      </div>
    </div>
  );
};
