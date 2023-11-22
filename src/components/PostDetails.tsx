import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { CommentData } from '../types/Comment';
import {
  getCommentsAsync,
  deleteCommentAsync,
  setComments,
  addCommentAsync,
} from '../features/comments/commentsSlice';

export const PostDetails: React.FC = () => {
  const [visible, setVisible] = useState(false);

  const dispatch = useAppDispatch();
  const { selectedPost } = useAppSelector(state => state.selectedPost);
  const {
    comments,
    loading,
    hasError,
  } = useAppSelector(state => state.comments);

  function loadComments() {
    if (selectedPost) {
      dispatch(getCommentsAsync(selectedPost.id));
    }
  }

  const addComment = async ({ name, email, body }: CommentData) => {
    const newComment = {
      name,
      email,
      body,
      postId: selectedPost?.id || 0,
    };

    await dispatch(addCommentAsync(newComment));
  };

  const deleteComment = async (commentId: number) => {
    const newComments = comments.filter(
      comment => comment.id !== commentId,
    );

    await dispatch(deleteCommentAsync(commentId));
    dispatch(setComments(newComments));
  };

  useEffect(loadComments, [selectedPost?.id]);

  const isLoadingErrorVisible = !loading && hasError;
  const isNoCommentsVisible = !loading && !hasError && !comments.length;
  const areCommentsVisible = !loading && !hasError && !!comments.length;
  const isWriteCommentButtonVisible = !loading && !hasError && !visible;
  const isNewCommentFormVisible = !loading && !hasError && visible;

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">
          {`#${selectedPost?.id}: ${selectedPost?.title}`}
        </h2>

        <p data-cy="PostBody">
          {selectedPost?.body}
        </p>
      </div>

      <div className="block">
        {loading && (
          <Loader />
        )}

        {isLoadingErrorVisible && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {isNoCommentsVisible && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {areCommentsVisible && (
          <>
            <p className="title is-4">Comments:</p>

            {comments.map(comment => {
              const {
                id,
                email,
                name,
                body,
              } = comment;

              return (
                <article
                  className="message is-small"
                  key={id}
                  data-cy="Comment"
                >
                  <div className="message-header">
                    <a
                      href={`mailto:${email}`}
                      data-cy="CommentAuthor"
                    >
                      {name}
                    </a>

                    <button
                      data-cy="CommentDelete"
                      type="button"
                      className="delete is-small"
                      aria-label="delete"
                      onClick={() => deleteComment(id)}
                    >
                      delete button
                    </button>
                  </div>

                  <div className="message-body" data-cy="CommentBody">
                    {body}
                  </div>
                </article>
              );
            })}
          </>
        )}

        {isWriteCommentButtonVisible && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setVisible(true)}
          >
            Write a comment
          </button>
        )}

        {isNewCommentFormVisible && (
          <NewCommentForm onSubmit={addComment} />
        )}
      </div>
    </div>
  );
};
