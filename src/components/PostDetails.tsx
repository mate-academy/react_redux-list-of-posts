import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { initComments, initDeleteComment } from '../features/comments';
import { removeComment } from '../features/comments';

export const PostDetails: React.FC = () => {
  const selectedPost = useAppSelector(state => state.selectedPost.selectedPost);
  const dispatch = useAppDispatch();
  const { comments, isLoadingComments, hasCommentError } = useAppSelector(
    state => state.comments,
  );
  const [visible, setVisible] = useState(false);

  const handleDeleteComment = async (commentId: number) => {
    try {
      dispatch(removeComment(commentId));
      await dispatch(initDeleteComment(commentId));
    } catch (error) {}
  };

  useEffect(() => {
    if (selectedPost) {
      dispatch(initComments(selectedPost.id));
      setVisible(false);
    }
  }, [selectedPost]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${selectedPost?.id}: ${selectedPost?.title}`}</h2>

        <p data-cy="PostBody">{selectedPost?.body}</p>
      </div>

      <div className="block">
        {isLoadingComments && <Loader />}

        {!isLoadingComments && hasCommentError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {!isLoadingComments && !hasCommentError && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {!isLoadingComments && !hasCommentError && comments.length > 0 && (
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

        {!isLoadingComments && !hasCommentError && !visible && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setVisible(true)}
          >
            Write a comment
          </button>
        )}

        {!isLoadingComments && !hasCommentError && visible && (
          <NewCommentForm />
        )}
      </div>
    </div>
  );
};
