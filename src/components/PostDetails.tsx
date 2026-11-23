import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import { commentsInit, removeComment } from '../features/comment';

export const PostDetails: React.FC = () => {
  const [formVisible, setFormVisible] = useState(false);

  const dispatch = useAppDispatch();
  const { comments, commentsLoading, commentsError } = useAppSelector(
    state => state.comments,
  );
  const { selectedPost } = useAppSelector(state => state.posts);

  function loadComments() {
    setFormVisible(false);
    dispatch(commentsInit(selectedPost!.id!));
  }

  const onDelete = async (commentId: number) => {
    await dispatch(removeComment(commentId));
  };

  useEffect(loadComments, [selectedPost, selectedPost?.id, dispatch]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${selectedPost?.id}: ${selectedPost?.title}`}</h2>

        <p data-cy="PostBody">{selectedPost?.body}</p>
      </div>

      <div className="block">
        {commentsLoading && <Loader />}

        {!commentsLoading && commentsError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {!commentsLoading && !commentsError && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {!commentsLoading && !commentsError && comments.length > 0 && (
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
                    onClick={() => onDelete(comment.id)}
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

        {!commentsLoading && !commentsError && !formVisible && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setFormVisible(true)}
          >
            Write a comment
          </button>
        )}

        {!commentsLoading && !commentsError && formVisible && (
          <NewCommentForm />
        )}
      </div>
    </div>
  );
};
