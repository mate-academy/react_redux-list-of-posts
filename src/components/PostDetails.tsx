import React from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import {
  useCreateCommentMutation,
  useDeleteCommentMutation,
  usePostCommentsQuery,
} from '../api/api';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setIsVisible } from '../features/comments/commentsSlice';
import { CommentData } from '../types/Comment';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const {
    data: comments = [],
    isLoading,
    isError,
    isSuccess,
    isUninitialized,
  } = usePostCommentsQuery(post.id);
  const dispatch = useAppDispatch();
  const isVisible = useAppSelector(state => state.comments.isVisible);
  const [addComment] = useCreateCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();

  async function handleDeleteComment(commentId: number) {
    try {
      const deleteCommentPromise = deleteComment(commentId);

      await deleteCommentPromise.unwrap();
    } catch {
      alert('cannot delete comment');
    }
  }

  async function handleAddComment(data: CommentData) {
    try {
      const addCommentPromise = addComment({ ...data, postId: post.id });

      await addCommentPromise.unwrap();
    } catch {
      alert('cannot add comment');
    }
  }

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${post.id}: ${post.title}`}</h2>
        <p data-cy="PostBody">{post.body}</p>
      </div>

      <div className="block">
        {isLoading || (isUninitialized && <Loader />)}

        {isError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {isSuccess && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {isSuccess && comments.length > 0 && (
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
                  ></button>
                </div>

                <div className="message-body" data-cy="CommentBody">
                  {comment.body}
                </div>
              </article>
            ))}
          </>
        )}

        {isSuccess && !isVisible && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => dispatch(setIsVisible(true))}
          >
            Write a comment
          </button>
        )}

        {isSuccess && isVisible && (
          <NewCommentForm onSubmit={handleAddComment} />
        )}
      </div>
    </div>
  );
};
