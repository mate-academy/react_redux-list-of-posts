import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

import * as commentsApi from '../api/comments';

import { CommentData } from '../types/Comment';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { commentsSlice } from '../features/slices/commentsSlice';

export const PostDetails: React.FC = () => {
  const [visible, setVisible] = useState(false);

  const post = useAppSelector(state => state.selectedPost.selectedPostItem);
  const { comments, loaded, hasError } = useAppSelector(
    state => state.comments,
  );

  const { setComments, setLoaded, setError } = commentsSlice.actions;

  const dispatch = useAppDispatch();

  async function loadComments() {
    dispatch(setLoaded(false));
    setVisible(false);
    dispatch(setError(false));

    if (!post || !post.id) {
      return null;
    }

    try {
      const commentsFromServer = await commentsApi.getPostComments(post.id);

      dispatch(setComments(commentsFromServer));
    } catch (error) {
      dispatch(setError(true));
    } finally {
      dispatch(setLoaded(true));
    }
  }

  useEffect(() => {
    loadComments();
  }, [post]);

  if (!post) {
    return null;
  }

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
      dispatch(setError(true));
    }
  };

  const deleteComment = async (commentId: number) => {
    dispatch(setComments(comments.filter(comment => comment.id !== commentId)));

    try {
      await commentsApi.deleteComment(commentId);
    } catch (error) {
      dispatch(setError(true));
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
