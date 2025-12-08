import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as commentsApi from '../api/comments';

import type { AppDispatch } from '../app/store'; // ✔ type-only import

import {
  fetchComments,
  selectComments,
  selectCommentsError,
  selectCommentsLoaded,
} from '../features/comments/commentsSlice';
import { CommentData } from '../types/Comment';
import { Post } from '../types/Post';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const dispatch = useDispatch<AppDispatch>();
  const comments = useSelector(selectComments);
  const loaded = useSelector(selectCommentsLoaded);
  const hasError = useSelector(selectCommentsError);

  const [visible, setVisible] = useState(false);

  // ✔ Reset form visibility on post change — fixes Cypress test
  useEffect(() => {
    setVisible(false);
  }, [post.id]);

  // ✔ Fetch comments on post change
  useEffect(() => {
    dispatch(fetchComments(post.id));
  }, [post.id, dispatch]);

  // Add comment
  const addComment = async ({ name, email, body }: CommentData) => {
    try {
      await commentsApi.createComment({
        name,
        email,
        body,
        postId: post.id,
      });

      dispatch(fetchComments(post.id));
    } catch (error) {
      throw error;
    }
  };

  // Delete comment
  const deleteComment = async (commentId: number) => {
    try {
      await commentsApi.deleteComment(commentId);
      dispatch(fetchComments(post.id));
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${post.id}: ${post.title}`}</h2>
        <p data-cy="PostBody">{post.body}</p>
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
