import React, { useCallback, useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { CommentData } from '../types/Comment';
import {
  addPostComment,
  deletePostComment,
  getPostComments,
} from '../services/comment.service';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  setComments,
  setCommentsError,
  setCommentsLoading,
  addComment as addCommentAction,
  deleteComment as deleteCommentAction,
} from '../features/commentsSlice';

export const PostDetails: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);

  const post = useAppSelector(state => state.posts.selectedPost);
  const {
    items: comments,
    loaded,
    hasError: commentsError,
  } = useAppSelector(state => state.comments);

  const [error, setError] = useState({
    add: false,
    delete: false,
  });

  const loadComments = useCallback(() => {
    if (!post) {
      return;
    }

    dispatch(setCommentsLoading());
    setError({ add: false, delete: false });
    setIsFormVisible(false);

    getPostComments(post.id)
      .then(data => dispatch(setComments(data)))
      .catch(() => dispatch(setCommentsError()));
  }, [post, dispatch]);

  useEffect(() => {
    loadComments();
  }, [loadComments]);

  const addComment = async ({ name, email, body }: CommentData) => {
    if (!post) {
      return;
    }

    setError(prev => ({ ...prev, add: false }));

    try {
      const createdComment = await addPostComment({
        name,
        email,
        body,
        postId: post.id,
      });

      dispatch(addCommentAction(createdComment));
    } catch {
      setError(prev => ({ ...prev, add: true }));
      throw new Error();
    }
  };

  const deleteComment = async (commentId: number) => {
    setError(prev => ({ ...prev, delete: false }));

    const originalComments = [...comments];

    dispatch(deleteCommentAction(commentId));

    try {
      await deletePostComment(commentId);
    } catch {
      setError(prev => ({ ...prev, delete: true }));
      dispatch(setComments(originalComments));
    }
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

        {loaded && (commentsError || error.delete || error.add) && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {loaded && !commentsError && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {loaded && !commentsError && comments.length > 0 && (
          <>
            <p className="title is-4">Comments:</p>
            {comments.map(comment => (
              <article
                key={comment.id}
                className="message is-small"
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

        {loaded && !commentsError && !isFormVisible && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setIsFormVisible(true)}
          >
            Write a comment
          </button>
        )}
      </div>

      {loaded && !commentsError && isFormVisible && (
        <NewCommentForm onSubmit={addComment} />
      )}
    </div>
  );
};
