import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import * as commentsApi from '../api/comments';
import { CommentData } from '../types/Comment';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  fetchComments,
  addComment,
  deleteComment,
} from '../features/commentsSlice';

export const PostDetails: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentPost = useAppSelector(state => state.currentPost.currentPost);
  const { comments, status, error } = useAppSelector(state => state.comments);
  const isLoading = status === 'loading';
  const hasError = status === 'failed';
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (currentPost?.id) {
      dispatch(fetchComments(currentPost.id));
    }
  }, [dispatch, currentPost?.id]);

  const handleAddComment = async ({ name, email, body }: CommentData) => {
    try {
      const newComment = await commentsApi.createComment({
        name,
        email,
        body,
        postId: currentPost.id,
      });

      dispatch(addComment(newComment));
    } catch (error) {
      console.error('Failed to add comment:', error);
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    try {
      dispatch(deleteComment(commentId));
      await commentsApi.deleteComment(commentId);
    } catch (error) {
      console.error('Failed to delete comment:', error);
    }
  };

  if (!currentPost) {
    return <p>Choose a post</p>;
  }

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${currentPost.id}: ${currentPost.title}`}</h2>
        <p data-cy="PostBody">{currentPost.body}</p>
      </div>

      <div className="block">
        {isLoading && <Loader />}
        {hasError && (
          <div className="notification is-danger">
            Something went wrong: {error}
          </div>
        )}

        {!isLoading && !hasError && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {!isLoading && !hasError && comments.length > 0 && (
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

        {!isLoading && !hasError && !visible && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setVisible(true)}
          >
            Write a comment
          </button>
        )}

        {!isLoading && !hasError && visible && (
          <NewCommentForm onSubmit={handleAddComment} />
        )}
      </div>
    </div>
  );
};
