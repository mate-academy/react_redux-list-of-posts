import { useEffect } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

import * as commentsApi from '../api/comments';

import { CommentData } from '../types/Comment';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { RootState } from '../app/store';
import {
  setComments, setCommentsHasError, setCommentsLoaded, setVisible,
} from '../features/commentsSlice';

export const PostDetails = () => {
  const {
    selectedPost,
  } = useAppSelector(
    (state: RootState) => state.selectedPost,
  );

  const {
    comments, commentsLoaded, commentsHasError, visible,
  } = useAppSelector(
    (state: RootState) => state.comments,
  );

  const selectedPostId = selectedPost?.id || 0;

  const dispatch = useAppDispatch();

  function loadComments() {
    dispatch(setCommentsLoaded(false));
    dispatch(setCommentsHasError(false));
    dispatch(setVisible(false));

    commentsApi.getPostComments(selectedPostId)
      .then((data) => dispatch(setComments(data))) // save the loaded comments
      .catch(() => dispatch(setCommentsHasError(true))) // show an error when something went wrong
      .finally(() => dispatch(setCommentsLoaded(true))); // hide the spinner
  }

  useEffect(loadComments, [selectedPostId]);

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
        postId: selectedPostId,
      });

      const newComments = [...comments, newComment];

      dispatch(setComments(newComments));

      // setComments([...comments, newComment]);
      // works wrong if we wrap `addComment` with `useCallback`
      // because it takes the `comments` cached during the first render
      // not the actual ones
    } catch (error) {
      // we show an error message in case of any error
      dispatch(setCommentsHasError(true));
    }
  };

  const deleteComment = async (commentId: number) => {
    // we delete the comment immediately so as
    // not to make the user wait long for the actual deletion
    const newComments = comments.filter(
      comment => comment.id !== commentId,
    );

    dispatch(setComments(newComments));

    await commentsApi.deleteComment(commentId);
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">
          {`#${selectedPostId}: ${selectedPost?.title}`}
        </h2>

        <p data-cy="PostBody">
          {selectedPost?.body}
        </p>
      </div>

      <div className="block">
        {!commentsLoaded && (
          <Loader />
        )}

        {commentsLoaded && commentsHasError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {commentsLoaded && !commentsHasError && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {commentsLoaded && !commentsHasError && comments.length > 0 && (
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

        {commentsLoaded && !commentsHasError && !visible && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => dispatch(setVisible(true))}
          >
            Write a comment
          </button>
        )}

        {commentsLoaded && !commentsHasError && visible && (
          <NewCommentForm onSubmit={addComment} />
        )}
      </div>
    </div>
  );
};
