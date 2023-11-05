/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  addComments,
  deleteComments,
  fetchComments,
} from '../app/thunks/commentThunk';
import { removeComment } from '../app/slices/commentsSlice';
import { CommentData } from '../types/Comment';

export const PostDetails: React.FC = () => {
  const {
    comments,
    isLoaded,
    hasError,
  } = useAppSelector(state => state.comments);
  const dispatch = useAppDispatch();
  const { selectedPost: post } = useAppSelector(state => state.posts);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(false);
    dispatch(fetchComments(post?.id as number));
  }, [post?.id]);

  const addComment = async ({ name, email, body }: CommentData) => {
    const data = {
      name,
      email,
      body,
      postId: post?.id as number,
    };

    await dispatch(addComments(data));
  };

  const deleteComment = async (commentId: number) => {
    dispatch(removeComment(commentId));

    await dispatch(deleteComments(commentId));
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
        {!isLoaded && (
          <Loader />
        )}

        {isLoaded && hasError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {isLoaded && !hasError && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {isLoaded && !hasError && comments.length > 0 && (
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

        {isLoaded && !hasError && !visible && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setVisible(true)}
          >
            Write a comment
          </button>
        )}

        {isLoaded && !hasError && visible && (
          <NewCommentForm onSubmit={addComment} />
        )}
      </div>
    </div>
  );
};
