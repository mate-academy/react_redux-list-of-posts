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

  // The same useEffect with async/await
  /*
  async function loadComments() {
    setloading(false);
    setVisible(false);
    setError(false);

    try {
      const commentsFromServer = await commentsApi.getPostComments(post.id);

      setComments(commentsFromServer);
    } catch (error) {
      setError(true);
    } finally {
      setloading(true);
    }
  };

  useEffect(() => {
    loadComments();
  }, []);

  useEffect(loadComments, [post.id]); // Wrong!
  // effect can return only a function but not a Promise
  */

  const addComment = async ({ name, email, body }: CommentData) => {
    try {
      const newComment = await commentsApi.createComment({
        name,
        email,
        body,
        postId: selectedPost?.id || 0,
      });

      dispatch(commentsAction.set([...comments, newComment]));

      // setComments([...comments, newComment]);
      // works wrong if we wrap `addComment` with `useCallback`
      // because it takes the `comments` cached during the first render
      // not the actual ones
    } catch (err) {
      dispatch(commentsAction.setError(true));
    }
  };

  const deleteComment = async (commentId: number) => {
    // we delete the comment immediately so as
    // not to make the user wait long for the actual deletion
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

        {!loading && error && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {!loading && !error && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {!loading && !error && comments.length > 0 && (
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

        {!loading && !error && !visible && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setVisible(true)}
          >
            Write a comment
          </button>
        )}

        {!loading && !error && visible && (
          <NewCommentForm onSubmit={addComment} />
        )}
      </div>
    </div>
  );
};
