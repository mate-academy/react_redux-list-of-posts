import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

import { Post } from '../types/Post';
import { CommentData } from '../types/Comment';
import { AppDispatch, RootState } from '../app/store';
import {
  fetchCommentsByPost,
  createPostComment,
  deletePostComment,
  clearComments,
} from '../features/comments/commentsSlice';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const dispatch = useDispatch<AppDispatch>();
  const commentsState = useSelector((state: RootState) => state.comments);
  const [visible, setVisible] = useState(false);

  const isCommentsLoading = !commentsState.loaded;
  const isCommentsError = commentsState.loaded && commentsState.hasError;
  const isNoComments =
    commentsState.loaded &&
    !commentsState.hasError &&
    commentsState.items.length === 0;
  const hasComments =
    commentsState.loaded &&
    !commentsState.hasError &&
    commentsState.items.length > 0;

  useEffect(() => {
    dispatch(clearComments());
    setVisible(false);
    dispatch(fetchCommentsByPost(post.id));
  }, [dispatch, post.id]);

  const addComment = async ({ name, email, body }: CommentData) => {
    try {
      await dispatch(
        createPostComment({
          name,
          email,
          body,
          postId: post.id,
        }),
      ).unwrap();
    } catch {
      // handled by comments slice
    }
  };

  const deleteComment = async (commentId: number) => {
    try {
      await dispatch(deletePostComment(commentId)).unwrap();
    } catch {
      // handled by comments slice
    }
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${post.id}: ${post.title}`}</h2>

        <p data-cy="PostBody">{post.body}</p>
      </div>

      <div className="block">
        {isCommentsLoading && <Loader />}

        {isCommentsError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {isNoComments && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {hasComments && (
          <>
            <p className="title is-4">Comments:</p>

            {commentsState.items.map(comment => (
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

        {commentsState.loaded && !commentsState.hasError && !visible && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setVisible(true)}
          >
            Write a comment
          </button>
        )}

        {commentsState.loaded && !commentsState.hasError && visible && (
          <NewCommentForm onSubmit={addComment} />
        )}
      </div>
    </div>
  );
};
