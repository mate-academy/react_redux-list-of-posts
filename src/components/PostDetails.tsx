import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

import * as commentsApi from '../api/comments';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  commentssAsync,
  deleteComment,
} from '../features/comments/commentsSlice';

export const PostDetails: React.FC = () => {
  const { selectedPost } = useAppSelector(state => state.selectedPost);
  const { comments, status } = useAppSelector(state => state.comments);
  const dispatch = useAppDispatch();
  const [visible, setVisible] = useState(false);
  const isLoading = status === 'loaded';
  const hasItems = status === 'items';
  const hasError = status === 'hasError';

  useEffect(() => {
    if (selectedPost) {
      setVisible(false);
      dispatch(commentssAsync(selectedPost.id));
    }
  }, [selectedPost?.id]);

  if (!selectedPost) {
    return null;
  }

  const handleDeleteComment = async (commentId: number) => {
    dispatch(deleteComment(commentId));

    await commentsApi.deleteComment(commentId);
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">
          {`#${selectedPost.id}: ${selectedPost.title}`}
        </h2>

        <p data-cy="PostBody">
          {selectedPost.body}
        </p>
      </div>

      <div className="block">
        {isLoading && (
          <Loader />
        )}

        {hasError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {hasItems && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {hasItems && comments.length > 0 && (
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

        {hasItems && !visible && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setVisible(true)}
          >
            Write a comment
          </button>
        )}

        {hasItems && visible && (
          <NewCommentForm />
        )}
      </div>
    </div>
  );
};
