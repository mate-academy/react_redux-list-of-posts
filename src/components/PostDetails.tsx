import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

// import * as commentsApi from '../api/comments';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import { loadComments, loadRemoveComment } from '../features/Coments/coments';

export const PostDetails: React.FC = () => {
  const dispatch = useAppDispatch();
  const [visible, setVisible] = useState(false);
  const selectedPost = useAppSelector(state => state.setPost.postSelected);
  const loading = useAppSelector(state => state.comments.loading);
  const hasError = useAppSelector(state => state.comments.error);
  const comments = useAppSelector(state => state.comments.comments);
  const userId = useAppSelector(state => state.posts.userSelected.id);

  useEffect(() => {
    if (selectedPost !== null) {
      setVisible(false);
      dispatch(loadComments(selectedPost.id));
    }
  }, [dispatch, userId, selectedPost]);

  const deleteComment = (itemId: number) => {
    return dispatch(loadRemoveComment(itemId));
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${selectedPost?.id}: ${selectedPost?.title}`}</h2>

        <p data-cy="PostBody">{selectedPost?.body}</p>
      </div>

      <div className="block">
        {loading && selectedPost !== null && <Loader />}

        {Boolean(hasError) && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {!loading && !hasError && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {!loading && !hasError && comments.length > 0 && (
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

        {!loading && !hasError && !visible && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setVisible(true)}
          >
            Write a comment
          </button>
        )}

        {!loading && !hasError && visible && <NewCommentForm />}
      </div>
    </div>
  );
};
