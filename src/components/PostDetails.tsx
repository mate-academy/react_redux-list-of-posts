import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

import { CommentData } from '../types/Comment';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  deleteComment,
  loadComments,
  postComment,
} from '../app/thunks/commentsThunk';
import { removeComment } from '../app/slices/commentsSlice';

export const PostDetails: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const {
    comments,
    isLoading,
    hasError,
  } = useAppSelector(state => state.comments);
  const { postSelected: post } = useAppSelector(state => state.posts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setVisible(false);
    dispatch(loadComments(post?.id as number));
  }, [post?.id]);

  const handleDeleteComment = async (commentId: number) => {
    dispatch(removeComment(commentId));

    dispatch(deleteComment(commentId));
  };

  const handleAddComment = async ({ name, email, body }: CommentData) => {
    const data = {
      name,
      email,
      body,
      postId: post?.id as number,
    };

    await dispatch(postComment(data));
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
        {!isLoading && (
          <Loader />
        )}

        {isLoading && hasError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {isLoading && !hasError && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {isLoading && !hasError && comments.length > 0 && (
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
                    onClick={() => handleDeleteComment(comment.id)}
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

        {isLoading && !hasError && !visible && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setVisible(true)}
          >
            Write a comment
          </button>
        )}

        {isLoading && !hasError && visible && (
          <NewCommentForm onSubmit={handleAddComment} />
        )}
      </div>
    </div>
  );
};
