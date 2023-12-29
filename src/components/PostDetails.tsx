/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable max-len */
import React, { useEffect } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import * as commentsActions from '../features/commentsSlice';

import * as commentsApi from '../api/comments';

import { CommentData } from '../types/Comment';
import { useAppDispatch, useAppSelector } from '../app/hooks';

export const PostDetails: React.FC = () => {
  const dispatch = useAppDispatch();
  const { userPost } = useAppSelector(state => state.selectedPost);
  const {
    comments, loaded, hasError, visible,
  } = useAppSelector(state => state.comments);

  function loadComments() {
    dispatch(commentsActions.resetError());
    dispatch(commentsActions.setLoaded());
    dispatch(commentsActions.resetVisible());

    if (userPost?.id) {
      commentsApi.getPostComments(userPost.id)
        .then(data => dispatch(commentsActions.setComments(data)))
        .catch(() => dispatch(commentsActions.setError()))
        .finally(() => dispatch(commentsActions.resetLoaded()));
    }
  }

  useEffect(() => {
    loadComments();
  }, [userPost?.id]);

  const addComment = async ({ name, email, body }: CommentData) => {
    try {
      if (userPost) {
        const newComment = await commentsApi.createComment({
          name,
          email,
          body,
          postId: userPost?.id,
        });

        dispatch(commentsActions.addComment(newComment));
      }
    } catch (error) {
      dispatch(commentsActions.setError());
    }
  };

  const deleteComment = async (commentId: number) => {
    try {
      dispatch(commentsActions.removeComment(commentId));

      await commentsApi.deleteComment(commentId);
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">
          {`#${userPost?.id}: ${userPost?.title}`}
        </h2>

        <p data-cy="PostBody">
          {userPost?.body}
        </p>
      </div>

      <div className="block">
        {!loaded && (
          <Loader />
        )}

        {loaded && hasError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {loaded && !hasError && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {loaded && !hasError && comments.length > 0 && (
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

        {loaded && !hasError && !visible && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => dispatch(commentsActions.setVisible())}
          >
            Write a comment
          </button>
        )}

        {loaded && !hasError && visible && (
          <NewCommentForm onSubmit={addComment} />
        )}
      </div>
    </div>
  );
};
