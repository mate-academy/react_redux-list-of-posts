import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

import * as actionComments from '../features/comments/commentsSlice';
import { CommentData } from '../types/Comment';
import { useAppDispatch, useAppSelector } from '../app/hooks';

export const PostDetails: React.FC = () => {
  const { selectedPost } = useAppSelector(state => state.posts);
  const {
    id: idSelected,
    title: titleSelected,
    body: bodySelected,
  } = selectedPost || { id: 0, title: '', body: '' };
  const { comments, loader, hasError } = useAppSelector(
    state => state.comments,
  );
  const dispatch = useAppDispatch();

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(false);
    dispatch(actionComments.init(idSelected));
  }, [dispatch, idSelected]);

  const addComment = async ({ name, email, body }: CommentData) => {
    await dispatch(
      actionComments.addCommentThuck({
        name,
        email,
        body,
        postId: idSelected,
      }),
    );

    return Promise.resolve();
  };

  const deleteComment = async (commentId: number) => {
    dispatch(actionComments.setTempComment(commentId));
    dispatch(actionComments.deleteCommentThuck(commentId));
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${idSelected}: ${titleSelected}`}</h2>

        <p data-cy="PostBody">{bodySelected}</p>
      </div>

      <div className="block">
        {!loader && <Loader />}

        {loader && hasError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {loader && !hasError && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {loader && !hasError && comments.length > 0 && (
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

        {loader && !hasError && !visible && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setVisible(true)}
          >
            Write a comment
          </button>
        )}

        {loader && !hasError && visible && (
          <NewCommentForm onSubmit={addComment} />
        )}
      </div>
    </div>
  );
};
