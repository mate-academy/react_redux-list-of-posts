import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  deleteCommentAsync,
  getCommentsAsync,
} from '../features/comments/commentsSlice';
import { Status } from '../types/Status';

export const PostDetails: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const { selectedPost } = useAppSelector(state => state.posts);
  const { comments, status } = useAppSelector(state => state.comments);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (selectedPost) {
      dispatch(getCommentsAsync(selectedPost.id));
    }
  }, [selectedPost?.id]);

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
        {status === Status.Loading && (
          <Loader />
        )}

        {status === Status.Failed && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {status === Status.Idle && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {status === Status.Idle && comments.length > 0 && (
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
                    onClick={() => dispatch(deleteCommentAsync(comment.id))}
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

        {status === Status.Idle && !visible && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setVisible(true)}
          >
            Write a comment
          </button>
        )}

        {status === Status.Idle && visible && (
          <NewCommentForm />
        )}
      </div>
    </div>
  );
};
