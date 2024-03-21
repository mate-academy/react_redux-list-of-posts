import { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

import * as commentsApi from '../api/comments';

import { Comment, CommentData } from '../types/Comment';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { actions as commentsActions } from '../reducers/comments';

export const PostDetails = () => {
  const dispatch = useAppDispatch();
  const { selectedPost: post } = useAppSelector(state => state.selectedPost);
  const {
    items: comments,
    loaded,
    hasError,
  } = useAppSelector(state => state.comments);
  const [visible, setVisible] = useState(false);

  const setComments = (value: Comment[]) => {
    dispatch(commentsActions.setItems(value));
  };

  const pushComment = (value: Comment) => {
    dispatch(commentsActions.addItem(value));
  };

  const clearComment = (value: number) => {
    dispatch(commentsActions.clearItem(value));
  };

  const setLoaded = (value: boolean) => {
    dispatch(commentsActions.setLoaded(value));
  };

  const setError = (value: boolean) => {
    dispatch(commentsActions.setError(value));
  };

  function loadComments() {
    setLoaded(false);
    setError(false);
    setVisible(false);

    commentsApi
      .getPostComments(post?.id || 0)
      .then(setComments) // save the loaded comments
      .catch(() => setError(true)) // show an error when something went wrong
      .finally(() => setLoaded(true)); // hide the spinner
  }

  useEffect(loadComments, [post?.id]);

  const addComment = async ({ name, email, body }: CommentData) => {
    try {
      const newComment = await commentsApi.createComment({
        name,
        email,
        body,
        postId: post?.id || 0,
      });

      pushComment(newComment);
    } catch (error) {
      setError(true);
    }
  };

  const deleteComment = async (commentId: number) => {
    clearComment(commentId);

    await commentsApi.deleteComment(commentId);
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${post?.id}: ${post?.title}`}</h2>

        <p data-cy="PostBody">{post?.body}</p>
      </div>

      <div className="block">
        {!loaded && <Loader />}

        {loaded && hasError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {loaded && !hasError && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {loaded && !hasError && comments.length > 0 && (
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

        {loaded && !hasError && !visible && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setVisible(true)}
          >
            Write a comment
          </button>
        )}

        {loaded && !hasError && visible && (
          <NewCommentForm onSubmit={addComment} />
        )}
      </div>
    </div>
  );
};
