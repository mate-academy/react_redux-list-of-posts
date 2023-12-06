import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

import * as commentsApi from '../api/comments';

import { CommentData } from '../types/Comment';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  setComments,
  addNewComment,
  removeComment,
  setLoaded,
  setHasError,
} from '../features/commentsSlice';

export const PostDetails: React.FC = () => {
  const dispatch = useAppDispatch();
  const { selectedPost: post } = useAppSelector(state => state.selectedPost);
  const {
    comments,
    loaded,
    hasError,
  } = useAppSelector(state => state.comments);
  const [visible, setVisible] = useState(false);

  function loadComments() {
    if (!post) {
      return;
    }

    dispatch(setLoaded(false));
    dispatch(setHasError(false));
    setVisible(false);

    commentsApi.getPostComments(post.id || 0)
      .then(data => dispatch(setComments(data)))
      .catch(() => dispatch(setHasError(true)))
      .finally(() => dispatch(setLoaded(true)));
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

      dispatch(addNewComment(newComment));
    } catch (error) {
      // we show an error message in case of any error
      dispatch(setHasError(true));
    }
  };

  const deleteComment = async (commentId: number) => {
    dispatch(removeComment(commentId));

    await commentsApi.deleteComment(commentId);
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">
          {`#${post?.id}: ${post?.title}`}
        </h2>

        <p data-cy="PostBody">
          {post?.body}
        </p>
      </div>

      <div className="block">
        {!loaded && (
          <Loader />
        )}

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
