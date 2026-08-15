/* eslint-disable @typescript-eslint/indent */
/* eslint-disable import/no-extraneous-dependencies */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { useAppDispatch, useAppSelector } from '../app/hooks';

import {
  addComment,
  clearComments,
  deleteCommentRequest,
  loadComments,
  removeComment,
  restoreComment,
} from '../features/comments/commentsSlice';

import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

import { CommentData } from '../types/Comment';
import { Post } from '../types/Post';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const dispatch = useAppDispatch();

  const commentsState = useAppSelector(state => state.comments);

  const [visible, setVisible] = useState(false);
  const [addError, setAddError] = useState(false);
  const [deleteError, setDeleteError] = useState(false);

  const comments = commentsState.items;

  useEffect(() => {
    setVisible(false);
    setAddError(false);
    setDeleteError(false);

    dispatch(clearComments());
    dispatch(loadComments(post.id));
  }, [dispatch, post.id]);

  const handleAddComment = async (data: CommentData) => {
    setAddError(false);

    try {
      await dispatch(
        addComment({
          postId: post.id,
          data,
        }),
      ).unwrap();
    } catch {
      setAddError(true);

      throw new Error('Failed to add comment');
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    const comment = comments.find(item => item.id === commentId);

    if (!comment) {
      return;
    }

    setDeleteError(false);

    dispatch(removeComment(commentId));

    try {
      await dispatch(deleteCommentRequest(commentId)).unwrap();
    } catch {
      dispatch(restoreComment(comment));
      setDeleteError(true);
    }
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">
          #{post.id}: {post.title}
        </h2>

        <p data-cy="PostBody">{post.body}</p>
      </div>

      <div className="block">
        {!commentsState.loaded && <Loader />}

        {commentsState.loaded && commentsState.hasError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {deleteError && (
          <div className="notification is-danger" data-cy="DeleteCommentError">
            Unable to delete comment. Please try again.
          </div>
        )}

        {commentsState.loaded &&
          !commentsState.hasError &&
          comments.length === 0 && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

        {commentsState.loaded &&
          !commentsState.hasError &&
          comments.length > 0 && (
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
                    />
                  </div>

                  <div
                    className="message-body"
                    data-cy="CommentBody"
                    style={{ whiteSpace: 'pre-wrap' }}
                  >
                    {comment.body}
                  </div>
                </article>
              ))}
            </>
          )}

        {commentsState.loaded && !commentsState.hasError && !visible && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => {
              setVisible(true);
              setAddError(false);
            }}
          >
            Write a comment
          </button>
        )}

        {commentsState.loaded && !commentsState.hasError && visible && (
          <>
            {addError && (
              <div className="notification is-danger" data-cy="AddCommentError">
                Unable to add comment. Please try again.
              </div>
            )}

            <NewCommentForm onSubmit={handleAddComment} />
          </>
        )}
      </div>
    </div>
  );
};

PostDetails.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    userId: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  }).isRequired,
};
