import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

import * as commentsApi from '../api/comments';

import { CommentData } from '../types/Comment';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  add, loadComments, remove, setError,
} from '../features/comments/commentsSlice';

export const PostDetails: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const { selectedPost: post } = useAppSelector(state => state.selectedPost);
  const {
    loading,
    hasError,
    items: comments,
  } = useAppSelector(state => state.comments);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (post?.id) {
      dispatch(loadComments(post.id));
      setVisible(false);
    }
  }, [post?.id]);

  const addComment = async ({ name, email, body }: CommentData) => {
    if (!post?.id) {
      return;
    }

    const newComment = await commentsApi.createComment({
      name,
      email,
      body,
      postId: post?.id,
    });

    try {
      dispatch(add(newComment));
    } catch {
      dispatch(setError(true));
    }
  };

  const deleteComment = async (commentId: number) => {
    try {
      dispatch(remove(commentId));
      await commentsApi.deleteComment(commentId);
    } catch {
      dispatch(setError(true));
    }
  };

  return (
    <div className="content" data-cy="PostDetails">
      {post && (
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${post?.id}: ${post?.title}`}
          </h2>

          <p data-cy="PostBody">
            {post?.body}
          </p>
        </div>
      )}
      <div className="block">
        {loading && (
          <Loader />
        )}

        {!loading && hasError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {!loading && !hasError && !comments.length && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {!loading && !hasError && !!comments.length && (
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

        {!loading && !hasError && !visible && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setVisible(true)}
          >
            Write a comment
          </button>
        )}

        {!loading && !hasError && visible && (
          <NewCommentForm onSubmit={addComment} />
        )}
      </div>
    </div>
  );
};
