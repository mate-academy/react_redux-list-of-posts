import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import {
  setComments,
  clearComment,
  fetchComments,
  removeComment,
} from '../features/comments';
import { useAppDispatch, useAppSelector } from '../app/hooks';

export const PostDetails: React.FC = () => {
  const {
    comments,
    loaded,
    hasError,
  } = useAppSelector(state => state.comments);

  const [visible, setVisible] = useState(false);
  const dispatch = useAppDispatch();
  const { selectedPost } = useAppSelector(state => state.selectedPost);

  useEffect(() => {
    setVisible(false);
    if (selectedPost) {
      dispatch(fetchComments(selectedPost.id));
    }
  }, [selectedPost]);

  const handleRemoveComment = async (commentId: number) => {
    dispatch(clearComment(commentId));
    try {
      dispatch(removeComment(commentId));
    } catch {
      dispatch(setComments(comments));
    }
  };

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
        {!loaded && (
          <Loader />
        )}

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
                    onClick={() => handleRemoveComment(comment.id)}
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
          <NewCommentForm />
        )}
      </div>
    </div>
  );
};
