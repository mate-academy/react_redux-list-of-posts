import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

import * as commentsApi from '../api/comments';

import { Post } from '../types/Post';
import { CommentData } from '../types/Comment';
import { useAppDispatch, useAppSelector } from '../app/hooks';

import {
  fetchComments,
  setError as setCommentsError,
  setLoading as setCommentsLoading,
  addComment as addCommentToState,
  deleteComment as removeCommentFromState,
} from '../features/comments/commentsSlice';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const dispatch = useAppDispatch();

  const {
    items: comments,
    loaded: commentsLoaded,
    hasError: commentsError,
  } = useAppSelector(state => state.comments);

  const [visible, setVisible] = useState(false);

  function loadComments() {
    dispatch(setCommentsLoading(false));
    dispatch(setCommentsError(false));
    setVisible(false);

    commentsApi
      .getPostComments(post.id)
      .then(commentsList => dispatch(fetchComments(commentsList))) // save the loaded comments
      .catch(() => dispatch(setCommentsError(true))) // show an error when something went wrong
      .finally(() => dispatch(setCommentsLoading(true))); // hide the spinner
  }

  useEffect(loadComments, [dispatch, post.id]);

  // The same useEffect with async/await
  /*
  async function loadComments() {
    setLoaded(false);
    setVisible(false);
    setError(false);

    try {
      const commentsFromServer = await commentsApi.getPostComments(post.id);

      setComments(commentsFromServer);
    } catch (error) {
      setError(true);
    } finally {
      setLoaded(true);
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
        postId: post.id,
      });

      dispatch(addCommentToState(newComment));

      // setComments([...comments, newComment]);
      // works wrong if we wrap `addComment` with `useCallback`
      // because it takes the `comments` cached during the first render
      // not the actual ones
    } catch (error) {
      // we show an error message in case of any error
      dispatch(setCommentsError(true));
    }
  };

  const deleteComment = async (commentId: number) => {
    // we delete the comment immediately so as
    // not to make the user wait long for the actual deletion
    // eslint-disable-next-line max-len
    dispatch(removeCommentFromState(commentId));

    await commentsApi.deleteComment(commentId);
  };

  // #region conditions
  const isLoading = !commentsLoaded;
  const commentsFetchError = commentsLoaded && commentsError;
  const noCommentsNotification =
    commentsLoaded && !commentsError && !comments.length;
  const showComments = commentsLoaded && !commentsError && !!comments.length;
  const showWriteButton = commentsLoaded && !commentsError;
  const showNewCommentForm = showWriteButton;
  // #endregion

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${post.id}: ${post.title}`}</h2>

        <p data-cy="PostBody">{post.body}</p>
      </div>

      <div className="block">
        {isLoading && <Loader />}

        {commentsFetchError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {noCommentsNotification && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {showComments && (
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

        {showWriteButton && !visible && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setVisible(true)}
          >
            Write a comment
          </button>
        )}

        {showNewCommentForm && visible && (
          <NewCommentForm onSubmit={addComment} />
        )}
      </div>
    </div>
  );
};
