import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

import * as commentsApi from '../api/comments';

import { CommentData } from '../types/Comment';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  setComments,
  setLoading,
  setHasError,
  addNewComment,
  deleteOneComment,
} from '../features/CommentsSlice';

export const PostDetails: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const dispatch = useAppDispatch();
  const {
    comments,
    loading,
    hasError,
  } = useAppSelector(state => state.comments);
  const { selectedPost } = useAppSelector(state => state.selectedPost);

  function loadComments() {
    dispatch(setLoading(true));
    dispatch(setHasError(false));
    setVisible(false);

    if (selectedPost) {
      commentsApi.getPostComments(selectedPost.id)
        .then((commentsFromServer) => {
          dispatch(setComments(commentsFromServer));
        })
        .catch(() => dispatch(setHasError(true)))
        .finally(() => dispatch(setLoading(false)));
    }
  }

  useEffect(loadComments, [selectedPost?.id]);

  const addComment = async ({ name, email, body }: CommentData) => {
    try {
      if (selectedPost) {
        const newComment = await commentsApi.createComment({
          name,
          email,
          body,
          postId: selectedPost.id,
        });

        dispatch(addNewComment(newComment));
      }
    } catch (error) {
      dispatch(setHasError(true));
    }
  };

  const deleteComment = async (commentId: number) => {
    dispatch(deleteOneComment(commentId));
    await commentsApi.deleteComment(commentId);
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">
          {`#${selectedPost?.id}: ${selectedPost?.title}`}
        </h2>

        <p data-cy="PostBody">
          {selectedPost?.body}
        </p>
      </div>

      <div className="block">
        {loading && (
          <Loader />
        )}

        {!loading && hasError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {!loading && !hasError && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {!loading && !hasError && comments.length > 0 && (
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

        {!loading && !hasError && !visible && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setVisible(true)}
          >
            Write a comment
          </button>
        )}

        {!loading && !hasError && visible && (
          <NewCommentForm onSubmit={addComment} />
        )}
      </div>
    </div>
  );
};
