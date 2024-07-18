import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import { SelectedPostState } from '../features/selectedPost';
import * as commentsActions from '../features/comments';

export const PostDetails: React.FC = () => {
  const dispatch = useAppDispatch();
  const { selectedPost }: SelectedPostState = useAppSelector(
    state => state.selectedPost,
  );

  const commentsState: commentsActions.CommentsState = useAppSelector(
    state => state.comments,
  );

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (selectedPost) {
      dispatch(commentsActions.init(selectedPost.id));
      setVisible(false);
    }
  }, [dispatch, selectedPost]);

  const deleteComment = (commentId: number) =>
    dispatch(commentsActions.remove(commentId));

  const noCommets =
    !commentsState.loaded &&
    !commentsState.hasError &&
    commentsState.comments.length === 0;

  const сommetsAre =
    !commentsState.loaded &&
    !commentsState.hasError &&
    commentsState.comments.length > 0;

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${selectedPost?.id}: ${selectedPost?.title}`}</h2>

        <p data-cy="PostBody">{selectedPost?.body}</p>
      </div>

      <div className="block">
        {commentsState.loaded && !commentsState.hasError && <Loader />}

        {!commentsState.loaded && commentsState.hasError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {noCommets && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}
        {сommetsAre && (
          <>
            <p className="title is-4">Comments:</p>

            {commentsState.comments.map(comment => (
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
                      deleteComment(comment.id);
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

        {!commentsState.loaded && !commentsState.hasError && !visible && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setVisible(true)}
          >
            Write a comment
          </button>
        )}

        {!commentsState.loaded && !commentsState.hasError && visible && (
          <NewCommentForm />
        )}
      </div>
    </div>
  );
};
