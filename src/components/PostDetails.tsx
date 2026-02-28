/* eslint-disable @typescript-eslint/indent */

import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  getCommentsAsync,
  deleteCommentAsync,
} from '../features/commentsSlice';

export const PostDetails: React.FC = () => {
  const [visible, setVisible] = useState(false);

  const dispatch = useAppDispatch();

  const selectedPost = useAppSelector(state => state.author.selectedPost);
  const comments = useAppSelector(state => state.comments);

  useEffect(() => {
    if (selectedPost) {
      dispatch(getCommentsAsync(selectedPost.id));
    }

    setVisible(false);
  }, [selectedPost]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${selectedPost?.id}: ${selectedPost?.title}`}</h2>

        <p data-cy="PostBody">{selectedPost?.body}</p>
      </div>

      <div className="block">
        {comments.loaded && <Loader />}

        {comments.hasError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {comments.items.length === 0 &&
          !comments.loaded &&
          !comments.hasError && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

        {comments.items.length > 0 &&
          !comments.loaded &&
          !comments.hasError && (
            <>
              <p className="title is-4">Comments:</p>

              {comments.items.map(comment => (
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
                      onClick={() => {
                        dispatch(deleteCommentAsync(comment.id));
                      }}
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

        {!comments.loaded && !visible && !comments.hasError && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setVisible(prev => !prev)}
          >
            Write a comment
          </button>
        )}

        {visible && <NewCommentForm />}
      </div>
    </div>
  );
};
