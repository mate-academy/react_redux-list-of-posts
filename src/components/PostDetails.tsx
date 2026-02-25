import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

import { Comment, CommentData } from '../types/Comment';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  createCommentForPost,
  deleteCommentById,
  loadCommentsByPostId,
  removeComment,
  restoreComment,
  selectComments,
  selectCommentsHasError,
  selectCommentsLoaded,
} from '../store/commentsSlice';
import { selectSelectedPost } from '../store/selectedPostSlice';

export const PostDetails: React.FC = () => {
  const dispatch = useAppDispatch();
  const post = useAppSelector(selectSelectedPost);
  const comments = useAppSelector(selectComments);
  const loaded = useAppSelector(selectCommentsLoaded);
  const hasError = useAppSelector(selectCommentsHasError);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!post) {
      return;
    }

    setVisible(false);
    dispatch(loadCommentsByPostId(post.id));
  }, [dispatch, post]);

  if (!post) {
    return null;
  }

  const addComment = async ({ name, email, body }: CommentData) => {
    try {
      await dispatch(
        createCommentForPost({
          name,
          email,
          body,
          postId: post.id,
        }),
      ).unwrap();
    } catch (error) {
      // the error state is handled in Redux
    }
  };

  const deleteComment = async (comment: Comment, index: number) => {
    dispatch(removeComment(comment.id));

    try {
      await dispatch(deleteCommentById(comment.id)).unwrap();
    } catch (error) {
      dispatch(restoreComment({ comment, index }));
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

            {comments.map((comment, index) => (
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
                    onClick={() => deleteComment(comment, index)}
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
