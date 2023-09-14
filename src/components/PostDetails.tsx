import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';

import * as commentsActions from '../features/comments/commentsSlice';
import {
  createComment,
  deleteComment as deleteCommentFromAPI,
} from '../api/comments';

import { Post } from '../types/Post';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { CommentData } from '../types/Comment';
import { NewCommentForm } from '../features/newComment/NewCommentForm';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [visible, setVisible] = useState(false);

  const {
    comments,
    isLoading,
    error,
  } = useAppSelector(state => state.comments);

  const dispatch = useAppDispatch();

  const loadComments = async () => {
    setVisible(false);

    dispatch(commentsActions.init(post.id));
  };

  useEffect(() => {
    loadComments();
  }, [post.id]);

  const addComment = async ({ name, email, body }: CommentData) => {
    try {
      const newComment = await createComment({
        name,
        email,
        body,
        postId: post.id,
      });

      dispatch(commentsActions.add(newComment));
    } catch (err: any) {
      const defaultMessage = 'Something went wrong while creating new comment';

      dispatch(commentsActions.setError(err?.message || defaultMessage));
    }
  };

  const deleteComment = async (commentId: number) => {
    dispatch(commentsActions.remove(commentId));

    await deleteCommentFromAPI(commentId);
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">
          {`#${post.id}: ${post.title}`}
        </h2>

        <p data-cy="PostBody">
          {post.body}
        </p>
      </div>

      <div className="block">
        {isLoading && (
          <Loader />
        )}

        {!isLoading && error && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {!isLoading && !error && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {!isLoading && !error && comments.length > 0 && (
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

        {!isLoading && !error && !visible && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setVisible(true)}
          >
            Write a comment
          </button>
        )}

        {!isLoading && !error && visible && (
          <NewCommentForm onSubmit={addComment} />
        )}
      </div>
    </div>
  );
};
