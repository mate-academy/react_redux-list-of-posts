import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

import * as commentsApi from '../api/comments';

import { CommentData } from '../types/Comment';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectPost } from '../features/posts/selectedPostSlice';
import {
  commentsLoading,
  commentsLoadingFail,
  commentsLoadingSuccess,
  commentDelete,
  selectComments,
} from '../features/comments/commentsSlice';

export const PostDetails = React.memo(() => {
  const dispatch = useAppDispatch();
  const { selectedPost: post } = useAppSelector(selectPost);
  const {
    comments,
    loaded,
    hasError,
  } = useAppSelector(selectComments);

  const [visible, setVisible] = useState(false);

  function loadComments() {
    dispatch(commentsLoading());
    setVisible(false);

    if (post) {
      commentsApi.getPostComments(post.id)
        .then(commentsFromServer => (
          dispatch(commentsLoadingSuccess(commentsFromServer))
        ))
        .catch(() => dispatch(commentsLoadingFail()));
    }
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

      dispatch(commentsLoadingSuccess([...comments, newComment]));
    } catch {
      dispatch(commentsLoadingFail());
    }
  };

  const deleteComment = async (commentId: number) => {
    dispatch(commentDelete(commentId));

    await commentsApi.deleteComment(commentId);
  };

  return (
    <div className="content">
      <div className="block">
        <h2>
          {`#${post?.id}: ${post?.title}`}
        </h2>
        <p>{post?.body}</p>
      </div>

      <div className="block">
        {!loaded && <Loader />}

        {loaded && hasError && (
          <div className="notification is-danger">
            Something went wrong
          </div>
        )}

        {loaded && !hasError && comments.length === 0 && (
          <p className="title is-4">No comments yet</p>
        )}

        {loaded && !hasError && comments.length > 0 && (
          <>
            <p className="title is-4">Comments:</p>

            {comments.map(comment => (
              <article className="message is-small" key={comment.id}>
                <div className="message-header">
                  <a href={`mailto:${comment.email}`}>
                    {comment.name}
                  </a>

                  <button
                    type="button"
                    className="delete is-small"
                    aria-label="delete"
                    onClick={() => deleteComment(comment.id)}
                  >
                    delete button
                  </button>
                </div>

                <div className="message-body">
                  {comment.body}
                </div>
              </article>
            ))}
          </>
        )}

        {loaded && !hasError && !visible && (
          <button
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
});
