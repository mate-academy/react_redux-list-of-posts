import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { CommentData } from '../types/Comment';
import {
  addCommentAsync,
  deleteCommentAsync,
  deleteCommentState,
  fetchComments,
  selectCommentsState,
} from '../features/commentsSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectSelectedPost } from '../features/selectPostSlice';

export const PostDetails: React.FC = () => {
  const { loading, hasError, items } = useAppSelector(selectCommentsState);
  const [visible, setVisible] = useState(false);
  const dispatch = useAppDispatch();
  const selectedPost = useAppSelector(selectSelectedPost);

  function loadComments() {
    if (selectedPost) {
      dispatch(fetchComments(selectedPost.id));
      setVisible(false);
    }
  }

  useEffect(loadComments, [selectedPost?.id]);

  const addComment = async ({ name, email, body }: CommentData) => {
    if (selectedPost) {
      await dispatch(addCommentAsync({
        name,
        email,
        body,
        postId: selectedPost.id,
      }));
    }
  };

  const deleteComment = async (commentId: number) => {
    const deletedComment = items.find((comment) => comment.id === commentId);

    dispatch(deleteCommentState(commentId));
    if (deletedComment) {
      await dispatch(deleteCommentAsync({ commentId, deletedComment }));
    }
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${selectedPost?.id}: ${selectedPost?.title}`}</h2>

        <p data-cy="PostBody">{selectedPost?.body}</p>
      </div>

      <div className="block">
        {loading && <Loader />}

        {!loading && hasError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {!loading && !hasError && items.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {!loading && !hasError && items.length > 0 && (
          <>
            <p className="title is-4">Comments:</p>

            {items.map((comment) => (
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

        {!loading && !hasError && !visible && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setVisible(true)}
          >
            Write a comment
          </button>
        )}

        {!loading && !hasError && visible && (
          <NewCommentForm onSubmit={addComment} />
        )}
      </div>
    </div>
  );
};
