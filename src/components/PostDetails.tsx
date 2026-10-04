import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  setCommentsLoading,
  setCommentsSuccess,
  setCommentsError,
  removeComment,
} from '../features/comments';
import { getPostComments, deleteComment } from '../api/comments';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

export const PostDetails: React.FC = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const dispatch = useAppDispatch();
  const selectedPost = useAppSelector(state => state.selectedPost);
  const { loaded, hasError, items: comments } = useAppSelector(
    state => state.comments,
  );

  useEffect(() => {
    if (!selectedPost) {
      return;
    }

    setIsFormVisible(false);
    dispatch(setCommentsLoading());

    getPostComments(selectedPost.id)
      .then(commentsData => {
        dispatch(setCommentsSuccess(commentsData));
      })
      .catch(() => {
        dispatch(setCommentsError());
      });
  }, [selectedPost, dispatch]);

  const handleDeleteComment = (commentId: number) => {
    dispatch(removeComment(commentId));
    deleteComment(commentId);
  };

  if (!selectedPost) {
    return null;
  }

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">
          {`#${selectedPost.id}: ${selectedPost.title}`}
        </h2>
        <p data-cy="PostBody">{selectedPost.body}</p>
      </div>

      <div className="block">
        {!loaded && <Loader/>}

        {loaded && hasError && (
          <p className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </p>
        )}

        {loaded && !hasError && comments.length === 0 && (
          <p data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {loaded && !hasError && comments.length > 0 && (
          <>
            <p className="title is-5">Comments:</p>
            {comments.map(comment => (
              <article
                key={comment.id}
                className="message is-small"
                data-cy="Comment"
              >
                <div className="message-header">
                  <a
                    href={`mailto:${comment.email}`}
                    data-cy="CommentAuthor"
                  >
                    {comment.name}
                  </a>
                  <button
                    type="button"
                    className="delete is-small"
                    aria-label="delete"
                    onClick={() => handleDeleteComment(comment.id)}
                  />
                </div>
                <div className="message-body" data-cy="CommentBody">
                  {comment.body}
                </div>
              </article>
            ))}
          </>
        )}

        {loaded && !hasError && !isFormVisible && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setIsFormVisible(true)}
          >
            Write a comment
          </button>
        )}

        {loaded && !hasError && isFormVisible && (
          <NewCommentForm postId={selectedPost.id}/>
        )}
      </div>
    </div>
  );
};
