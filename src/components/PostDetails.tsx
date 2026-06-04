import React, { useEffect, useState } from 'react';

import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import * as commentsApi from '../api/comments';
import { Post } from '../types/Post';
import { CommentData } from '../types/Comment';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  setComments,
  setCommentsHasError,
  setCommentsLoaded,
} from '../features/comments/commentsSlice';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const dispatch = useAppDispatch();
  const [visible, setVisible] = useState(false);

  const {
    items: comments,
    loaded: commentsLoaded,
    hasError: commentsError,
  } = useAppSelector(state => state.comments);

  function loadComments() {
    dispatch(setCommentsLoaded(false));
    dispatch(setCommentsHasError(false));
    setVisible(false);

    commentsApi
      .getPostComments(post.id)
      .then(data => dispatch(setComments(data)))
      .catch(() => dispatch(setCommentsHasError(true)))
      .finally(() => dispatch(setCommentsLoaded(true)));
  }

  useEffect(loadComments, [post.id, dispatch]);

  const addComment = async ({ name, email, body }: CommentData) => {
    try {
      const newComment = await commentsApi.createComment({
        name,
        email,
        body,
        postId: post.id,
      });

      dispatch(setComments([...comments, newComment]));
    } catch (error) {
      dispatch(setCommentsHasError(true));
    }
  };

  const deleteComment = async (commentId: number) => {
    const updatedComments = comments.filter(
      comment => comment.id !== commentId,
    );

    dispatch(setComments(updatedComments));

    try {
      await commentsApi.deleteComment(commentId);
    } catch (error) {
      dispatch(setCommentsHasError(true));
    }
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${post.id}: ${post.title}`}</h2>
        <p data-cy="PostBody">{post.body}</p>
      </div>

      <div className="block">
        {!commentsLoaded && <Loader />}

        {commentsLoaded && commentsError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {commentsLoaded && !commentsError && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {commentsLoaded && !commentsError && comments.length > 0 && (
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

        {commentsLoaded && !commentsError && !visible && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setVisible(true)}
          >
            Write a comment
          </button>
        )}

        {commentsLoaded && !commentsError && visible && (
          <NewCommentForm onSubmit={addComment} />
        )}
      </div>
    </div>
  );
};
