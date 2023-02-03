import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { deleteComments, initComments } from '../features/commentsSlice';

export const PostDetails: React.FC = () => {
  const { selectedPost } = useAppSelector(state => state.selectedPost);
  const {
    comments,
    loaded,
    hasError,
  } = useAppSelector(state => state.comments);
  const dispatch = useAppDispatch();

  const [visible, setVisible] = useState(false);

  const isNoCommentsMessage = !loaded && !hasError && comments.length === 0;
  const isComments = !loaded && !hasError && comments.length > 0;
  const isButton = !loaded && !hasError && !visible;
  const isNewCommentForm = !loaded && !hasError && visible;

  function loadComments() {
    setVisible(false);

    if (selectedPost) {
      dispatch(initComments(selectedPost?.id));
    }
  }

  useEffect(loadComments, [selectedPost?.id]);

  const handleDeleteComment = (commentId: number) => {
    dispatch(deleteComments(commentId));
  };

  return (
    <div className="content" data-cy="PostDetails">
      {selectedPost && (
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${selectedPost.id}: ${selectedPost.title}`}
          </h2>

          <p data-cy="PostBody">
            {selectedPost.body}
          </p>
        </div>
      )}

      <div className="block">
        {loaded && (
          <Loader />
        )}

        {!loaded && hasError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {isNoCommentsMessage && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {isComments && (
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

        {isButton && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setVisible(true)}
          >
            Write a comment
          </button>
        )}

        {isNewCommentForm && (
          <NewCommentForm />
        )}
      </div>
    </div>
  );
};
