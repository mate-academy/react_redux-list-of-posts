import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  fetchComments,
  addComment,
  deleteComment,
} from '../features/commentsSlice';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Comment } from '../types/Comment';

export const PostDetails: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedPost = useAppSelector(state => state.selectedPost);
  const {
    items: comments,
    loaded,
    hasError,
  } = useAppSelector(state => state.comments);

  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    if (selectedPost) {
      dispatch(fetchComments(selectedPost.id));
      setIsFormVisible(false);
    }
  }, [dispatch, selectedPost]);

  if (!selectedPost) {
    return null;
  }

  const handleAddComment = async (commentData: Omit<Comment, 'id'>) => {
    await dispatch(addComment(commentData)).unwrap();
  };

  const handleDeleteComment = (commentId: number) => {
    dispatch(deleteComment(commentId));
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${selectedPost.id}: ${selectedPost.title}`}</h2>
        <p data-cy="PostBody">{selectedPost.body}</p>
      </div>

      <div className="block">
        {!loaded && <Loader />}

        {loaded && hasError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong!
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
            type="button"
            className="button is-link"
            data-cy="WriteCommentButton"
            onClick={() => setIsFormVisible(true)}
          >
            Write a comment
          </button>
        )}

        {loaded && !hasError && isFormVisible && (
          <NewCommentForm
            postId={selectedPost.id}
            onSubmit={handleAddComment}
          />
        )}
      </div>
    </div>
  );
};
