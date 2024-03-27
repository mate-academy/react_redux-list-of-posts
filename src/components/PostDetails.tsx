/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable import/extensions */
/* eslint-disable operator-linebreak */
import { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

import * as commentsApi from '../api/comments';
import { Comment, CommentData } from '../types/Comment';
import {
  setComments,
  setIsLoading,
  setIsError,
  addComment,
  deleteComment,
} from '../store/reducers/CommentsSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks/hooks';

export const PostDetails = () => {
  const { comments, isLoading, error } = useAppSelector(
    state => state.comments,
  );

  const dispatch = useAppDispatch();
  const [visible, setVisible] = useState(false);

  const { post } = useAppSelector(state => state.post);

  function loadComments() {
    setIsLoading(false);
    setIsError(false);
    dispatch(setIsLoading(true));
    dispatch(setIsError(false));
    setVisible(false);

    commentsApi
      .getPostComments(post?.id || 0)
      .then((commentsFromServer: Comment[]) => {
        dispatch(setComments(commentsFromServer));
      })
      .catch(() => dispatch(setIsError(true)))
      .finally(() => dispatch(setIsLoading(false)));
  }

  useEffect(loadComments, [post, dispatch]);
  const handleAddComment = async ({ name, email, body }: CommentData) => {
    try {
      const newComment = await commentsApi.createComment({
        name,
        email,
        body,
        postId: post?.id || 0,
      });
      const tempId =
        Math.floor(Math.random() * (99999999 - 10000000 + 1)) + 10000000;

      dispatch(addComment({ ...newComment, id: tempId }));
    } catch (e) {
      dispatch(setIsError(true));
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    dispatch(deleteComment(commentId));

    await commentsApi.deleteComment(commentId);
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">
          {post ? `#${post.id}: ${post.title}` : 'Loading...'}
        </h2>
        <p data-cy="PostBody">{post?.body}</p>
      </div>

      <div className="block">
        {isLoading && <Loader />}
        {!isLoading && error && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}
        {!isLoading && !error && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}
        {!isLoading && !error && comments.length > 0 && (
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
        {!isLoading && !error && !visible && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setVisible(true)}
          >
            Write a comment
          </button>
        )}
        {!isLoading && !error && visible && (
          <NewCommentForm onSubmit={handleAddComment} />
        )}
      </div>
    </div>
  );
};
