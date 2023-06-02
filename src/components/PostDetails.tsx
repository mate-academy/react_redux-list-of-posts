import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

import * as commentsApi from '../api/comments';
import { CommentData } from '../types/Comment';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  postComments, setComments, setError, setLoaded,
} from '../features/commentsSlice';
import { selectedPost } from '../features/selectedPostSlice';

export const PostDetails = () => {
  const post = useAppSelector(selectedPost);
  const dispatch = useAppDispatch();
  const { items: comments, loaded, hasError } = useAppSelector(postComments);
  const [visible, setVisible] = useState(false);

  function loadComments() {
    dispatch(setLoaded(false));
    dispatch(setError(false));
    setVisible(false);

    if (post) {
      commentsApi.getPostComments(post.id)
        .then(commentsFrom => dispatch(setComments(commentsFrom)))
        .catch(() => dispatch(setError(true)))
        .finally(() => dispatch(setLoaded(true)));
    }
  }

  useEffect(loadComments, [post?.id]);

  const addComment = async ({ name, email, body }: CommentData) => {
    try {
      if (post) {
        const newComment = await commentsApi.createComment({
          name,
          email,
          body,
          postId: post.id,
        });

        dispatch(setComments([...comments, newComment]));
      }
    } catch (error) {
      setError(true);
    }
  };

  const deleteComment = async (commentId: number) => {
    dispatch(setComments(comments.filter(
      comment => comment.id !== commentId,
    )));

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
