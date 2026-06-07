import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

import * as commentsApi from '../api/comments';

import { CommentData } from '../types/Comment';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  addComment as addCommentToStore,
  clearComments,
  deleteComment as deleteCommentFromStore,
  setComments,
  setCommentsError,
  startCommentsLoading,
} from '../features/comments';

export const PostDetails: React.FC = () => {
  const dispatch = useAppDispatch();

  const post = useAppSelector(state => state.selectedPost);
  const comments = useAppSelector(state => state.comments);

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!post) {
      dispatch(clearComments());

      return;
    }

    setVisible(false);
    dispatch(startCommentsLoading());

    commentsApi
      .getPostComments(post.id)
      .then(commentsFromServer => {
        dispatch(setComments(commentsFromServer));
      })
      .catch(() => {
        dispatch(setCommentsError());
      });
  }, [post, dispatch]);

  const addComment = async ({ name, email, body }: CommentData) => {
    if (!post) {
      return;
    }

    try {
      const newComment = await commentsApi.createComment({
        name,
        email,
        body,
        postId: post.id,
      });

      dispatch(addCommentToStore(newComment));
    } catch (error) {
      dispatch(setCommentsError());
    }
  };

  const deleteComment = async (commentId: number) => {
    dispatch(deleteCommentFromStore(commentId));

    await commentsApi.deleteComment(commentId);
  };

  if (!post) {
    return;
  }

  const isLoading = !comments.loaded;
  const isCommentsError = comments.loaded && comments.hasError;

  const hasNoComments =
    comments.loaded && !comments.hasError && comments.items.length === 0;

  const hasComments =
    comments.loaded && !comments.hasError && comments.items.length > 0;

  const canWriteComment = comments.loaded && !comments.hasError;

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${post.id}: ${post.title}`}</h2>

        <p data-cy="PostBody">{post.body}</p>
      </div>

      <div className="block">
        {isLoading && <Loader />}

        {isCommentsError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {hasNoComments && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {hasComments && (
          <>
            <p className="title is-4">Comments:</p>

            {comments.items.map(comment => (
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

        {canWriteComment && !visible && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setVisible(true)}
          >
            Write a comment
          </button>
        )}

        {canWriteComment && visible && <NewCommentForm onSubmit={addComment} />}
      </div>
    </div>
  );
};
