import React, { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import * as commentsActions from '../features/commentsSlice';

export const PostDetails: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedPost = useAppSelector(state => state.selectedPost);
  const [visible, setVisible] = useState(false);

  const {
    id,
    title,
    body,
  } = selectedPost as Post;

  const {
    items,
    loaded,
    hasError,
  } = useAppSelector(state => state.comments);

  const loadComments = async (postId: number) => {
    setVisible(false);

    dispatch(commentsActions.getComments(postId));
    dispatch(commentsActions.setComments(items));
  };

  useEffect(() => {
    loadComments(id);
  }, [id]);

  const deleteComment = (commentId: number) => {
    const deletedComment = items.filter(comment => comment.id !== commentId);

    dispatch(commentsActions.removeComment(commentId));
    dispatch(commentsActions.setComments(deletedComment));
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

        {loaded
          && !hasError
          && !items.length
          && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

        {loaded
          && !hasError
          && !!items.length
          && (
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

        {loaded
          && !hasError
          && !visible
          && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setVisible(true)}
            >
              Write a comment
            </button>
          )}

        {loaded
          && !hasError
          && visible
          && (
            <NewCommentForm />
          )}
      </div>
    </div>
  );
};
