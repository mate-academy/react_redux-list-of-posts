import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../app/store';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { UserDisplay } from '../components/UserDisplay';

import {
  fetchCommentsByPostId,
  clearComments,
  deleteComment,
} from '../features/comments/commentsSlice';

export const PostDetails: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const selectedPost = useSelector(
    (state: RootState) => state.selectedPost.selectedPost,
  );

  const {
    items: comments,
    loaded: commentsLoaded,
    hasError: commentsHasError,
  } = useSelector((state: RootState) => state.comments);

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    dispatch(clearComments());
    setVisible(false);

    if (selectedPost) {
      dispatch(fetchCommentsByPostId(selectedPost.id));
    }
  }, [selectedPost, dispatch]);

  const handleDeleteComment = (commentId: number) => {
    dispatch(deleteComment(commentId));
  };

  if (!selectedPost) {
    return (
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 className="title is-4">Post Details</h2>
          <p>Please select a post to view its details.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${selectedPost.id}: ${selectedPost.title}`}</h2>
        <p data-cy="PostBody">{selectedPost.body}</p>
        <p>
          <small>
            by <UserDisplay userId={selectedPost.userId} />
          </small>
        </p>
      </div>

      <div className="block">
        {!commentsLoaded && <Loader />}

        {commentsLoaded && commentsHasError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong while loading comments!
          </div>
        )}

        {commentsLoaded && !commentsHasError && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {commentsLoaded && !commentsHasError && comments.length > 0 && (
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

        {commentsLoaded && !commentsHasError && !visible && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setVisible(true)}
          >
            Write a comment
          </button>
        )}

        {commentsLoaded && !commentsHasError && visible && (
          <NewCommentForm postId={selectedPost.id} />
        )}
      </div>
    </div>
  );
};
