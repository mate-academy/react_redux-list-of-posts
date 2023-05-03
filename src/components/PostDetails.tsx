import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { deleteCommentById, getCommentsByPostId } from '../slices/comments';
import { NewCommentForm } from './NewCommentForm';
import { Comment } from '../types/Comment';

export const PostDetails: React.FC = () => {
  const { selectedPost } = useAppSelector(state => state.selectedPost);
  const dispatch = useAppDispatch();
  const {
    comments,
    isLoading: loaded,
    hasError,
  } = useAppSelector(state => state.comments);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    dispatch(getCommentsByPostId(selectedPost?.id || 0));
    setVisible(false);
  }, [selectedPost]);

  const makeFormVisible = () => {
    setVisible(true);
  };

  const removeComment = (comment: Comment) => {
    dispatch(deleteCommentById(comment.id));
  };

  if (loaded && !visible) {
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
          {loaded && (
            <Loader />
          )}
        </div>
      </div>
    );
  }

  if (hasError) {
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
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        </div>
      </div>
    );
  }

  if (comments.length === 0) {
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
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        </div>

        {!loaded && !hasError && !visible && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={makeFormVisible}
          >
            Write a comment
          </button>
        )}

        {!loaded && !hasError && visible && (
          <NewCommentForm />
        )}
      </div>
    );
  }

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
                  onClick={() => removeComment(comment)}
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

        {!loaded && !hasError && !visible && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={makeFormVisible}
          >
            Write a comment
          </button>
        )}

        {!hasError && visible && (
          <NewCommentForm />
        )}
      </div>
    </div>
  );
};
