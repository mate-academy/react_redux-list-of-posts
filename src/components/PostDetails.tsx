import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

import * as commentsApi from '../api/comments';

import { CommentData } from '../types/Comment';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  setCommentPost,
  setErrorComment,
  setLoadedComment,
} from '../features/commentSlice';

export const PostDetails: React.FC = () => {
  const dispatch = useAppDispatch();
  const { comments, loaded, error } = useAppSelector(
    state => state.commentPost,
  );
  const { selectedPost } = useAppSelector(state => state.selectedPost);
  const [visible, setVisible] = useState(false);

  function loadComments() {
    if (!selectedPost?.id) {
      return;
    }

    dispatch(setLoadedComment(false));
    dispatch(setErrorComment(false));
    setVisible(false);

    commentsApi
      .getPostComments(selectedPost?.id)
      .then(commnetFromServer => {
        dispatch(setCommentPost(commnetFromServer));
      })
      .catch(() => dispatch(setErrorComment(true)))
      .finally(() => dispatch(setLoadedComment(true)));
  }

  useEffect(loadComments, [selectedPost?.id, dispatch]);

  // The same useEffect with async/await

  const addComment = async ({ name, email, body }: CommentData) => {
    if (!selectedPost?.id) {
      return;
    }

    try {
      const newComment = await commentsApi.createComment({
        name,
        email,
        body,
        postId: selectedPost?.id,
      });

      dispatch(setCommentPost([...comments, newComment]));
    } catch (err) {
      dispatch(setErrorComment(true));
    }
  };

  const deleteComment = async (commentId: number) => {
    dispatch(
      setCommentPost(comments.filter(comment => comment.id !== commentId)),
    );
    await commentsApi.deleteComment(commentId);
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${selectedPost?.id}: ${selectedPost?.title}`}</h2>

        <p data-cy="PostBody">{selectedPost?.body}</p>
      </div>

      <div className="block">
        {!loaded && <Loader />}

        {loaded && error && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {loaded && !error && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {loaded && !error && comments.length > 0 && (
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

        {loaded && !error && !visible && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setVisible(true)}
          >
            Write a comment
          </button>
        )}

        {loaded && !error && visible && (
          <NewCommentForm onSubmit={addComment} />
        )}
      </div>
    </div>
  );
};
