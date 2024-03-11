import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

import * as commentsApi from '../api/comments';

import { Comment, CommentData } from '../types/Comment';
import { useAppDispatch, useAppSelector } from '../app/hooks';

import { actions as CommentsActions } from '../features/comments/commentsSlice';

export const PostDetails: React.FC = () => {
  const dispatch = useAppDispatch();
  const comments = useAppSelector(state => state.comments.items);
  const selectedPost = useAppSelector(state => state.selectedPost.post);
  const hasError = useAppSelector(state => state.comments.hasError);
  const isLoaded = useAppSelector(state => state.comments.loaded);

  const [visible, setVisible] = useState(false);

  const setComments = (commentsFromAPI: Comment[]) => {
    dispatch(CommentsActions.set(commentsFromAPI));
  };

  function loadComments() {
    dispatch(CommentsActions.setLoaded(false));
    dispatch(CommentsActions.setError(false));
    setVisible(false);

    if (!selectedPost) {
      return;
    }

    commentsApi
      .getPostComments(selectedPost.id)
      .then(commentsFromServer => setComments(commentsFromServer))
      .catch(() => dispatch(CommentsActions.setError(true)))
      .finally(() => {
        dispatch(CommentsActions.setLoaded(true));
        setVisible(true);
      });
  }

  useEffect(loadComments, [selectedPost]);

  const addComment = async ({ name, email, body }: CommentData) => {
    if (!selectedPost) {
      return;
    }

    try {
      const newComment = await commentsApi.createComment({
        name,
        email,
        body,
        postId: selectedPost.id,
      });

      dispatch(CommentsActions.add(newComment));
    } catch (error) {
      dispatch(CommentsActions.setError(true));
    }
  };

  const deleteComment = async (commentId: number) => {
    dispatch(CommentsActions.delete(commentId));

    await commentsApi.deleteComment(commentId);
  };

  if (!selectedPost) {
    return <p>No post here!</p>;
  }

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${selectedPost.id}: ${selectedPost.title}`}</h2>

        <p data-cy="PostBody">{selectedPost.body}</p>
      </div>

      <div className="block">
        {!isLoaded && <Loader />}

        {isLoaded && hasError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {isLoaded && !hasError && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {isLoaded && !hasError && comments.length > 0 && (
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

        {isLoaded && !hasError && !visible && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setVisible(true)}
          >
            Write a comment
          </button>
        )}

        {isLoaded && !hasError && visible && (
          <NewCommentForm onSubmit={addComment} />
        )}
      </div>
    </div>
  );
};
