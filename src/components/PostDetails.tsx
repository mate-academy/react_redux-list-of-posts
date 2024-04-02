import React, { useCallback, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../app/hooks';

import * as commentsApi from '../api/comments';

import * as commentsActions from '../features/commentsSlice';

import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

import { Post } from '../types/Post';
import { CommentData } from '../types/Comment';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const dispatch = useAppDispatch();
  const { comments, visible, loaded, hasError } = useAppSelector(
    state => state.comments,
  );

  useEffect(() => {
    dispatch(commentsActions.setLoaded(false));
    dispatch(commentsActions.setError(false));
    dispatch(commentsActions.setVisible(false));

    dispatch(commentsActions.loadComments(post.id));
  }, [dispatch, post.id]);

  const addComment = useCallback(
    async ({ name, email, body }: CommentData) => {
      try {
        const newComment = await commentsApi.createComment({
          name,
          email,
          body,
          postId: post.id,
        });

        dispatch(commentsActions.add(newComment));
      } catch (error) {
        dispatch(commentsActions.setError(true));
      }
    },
    [dispatch, post.id],
  );

  const deleteComment = useCallback(
    async (commentId: number) => {
      dispatch(commentsActions.remove(commentId));

      await commentsApi.deleteComment(commentId);
    },
    [dispatch],
  );

  const handleWriteCommentButtonClick = () => {
    dispatch(commentsActions.setVisible(true));
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
            onClick={handleWriteCommentButtonClick}
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
