import React, { useEffect } from 'react';
import { Loader } from './Loader';
import * as commentsActions from '../features/commentsSlice';
import * as commentsApi from '../api/comments';
import { NewCommentForm } from './NewCommentForm';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import { CommentData } from '../types/Comment';

export const PostDetails: React.FC = () => {
  const dispatch = useAppDispatch();

  const { post } = useAppSelector(state => state.selectedPost);
  const { comments, loaded, hasError, visible } = useAppSelector(
    state => state.comments,
  );

  function loadComments() {
    if (post) {
      dispatch(commentsActions.loadComments(post.id));
      dispatch(commentsActions.toggleVisible(false));
    }
  }

  useEffect(loadComments, [post, dispatch]);

  const addComment = async ({ name, email, body }: CommentData) => {
    if (!post) {
      return;
    }

    try {
      const newComment = await commentsApi.createComment({
        name,
        email,
        body,
        postId: post.id,
      });

      dispatch(commentsActions.addComment(newComment));
    } catch (error) {
      dispatch(commentsActions.setError(true));
    }
  };

  const deleteComment = async (commentId: number) => {
    dispatch(commentsActions.removeComment(commentId));

    await commentsApi.deleteComment(commentId);
  };

  if (!post) {
    return null;
  }

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
            onClick={() => dispatch(commentsActions.toggleVisible(true))}
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
