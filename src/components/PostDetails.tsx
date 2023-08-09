import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  fetchComments,
  removeChoosenComment,
  removeComment,
} from '../slices/commentsSlice';

export const PostDetails: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, loaded, hasError } = useAppSelector(state => state.comments);
  const [visible, setVisible] = useState(false);
  const { selectedPost } = useAppSelector(state => (
    state.selectedPost));
  const { id, title, body } = selectedPost || {};

  useEffect(() => {
    if (id) {
      dispatch(fetchComments(id));
    }

    setVisible(false);
  }, [id]);

  const deleteComment = async (commentId: number) => {
    dispatch(removeComment(commentId));
    await dispatch(removeChoosenComment(commentId));
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">
          {`#${id}: ${title}`}
        </h2>

        <p data-cy="PostBody">
          {body}
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

        {loaded && !hasError && items.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {loaded && !hasError && items.length > 0 && (
          <>
            <p className="title is-4">Comments:</p>

            {items.map(comment => (
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

        {selectedPost && loaded && !hasError && visible && (
          <NewCommentForm />
        )}
      </div>
    </div>
  );
};
