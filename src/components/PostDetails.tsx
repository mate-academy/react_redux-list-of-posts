/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

import * as commentsApi from '../api/comments';
import * as commentsActions from '../features/comments';

import { CommentData } from '../types/Comment';
import { Comment } from '../types/Comment';
import { useAppDispatch, useAppSelector } from '../app/hooks';

export const PostDetails: React.FC = () => {
  const [visible, setVisible] = useState(false);

  const post = useAppSelector(state => state.selectedPost);
  const { comments, loaded, hasError } = useAppSelector(
    state => state.comments,
  );
  const dispatch = useAppDispatch();
  const setComments = (comment: Comment) =>
    dispatch(commentsActions.commentsSlice.actions.setComments(comment));
  const setError = () =>
    dispatch(commentsActions.commentsSlice.actions.setError());
  const removeComment = (id: number) =>
    dispatch(commentsActions.commentsSlice.actions.removeComment(id));

  if (!post) {
    return;
  }

  useEffect(() => {
    dispatch(commentsActions.init(post.id));
  }, [post]);

  const addComment = async ({ name, email, body }: CommentData) => {
    try {
      const newComment = await commentsApi.createComment({
        name,
        email,
        body,
        postId: post.id,
      });

      setComments(newComment as Comment);
    } catch (error) {
      setError();
    }
  };

  const deleteComment = async (commentId: number) => {
    removeComment(commentId);
    await commentsApi.deleteComment(commentId);
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
