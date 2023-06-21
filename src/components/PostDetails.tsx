import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import * as commentsActions from '../features/commentsSlice';

import * as commentsApi from '../api/comments';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import { CommentData } from '../types/Comment';

export const PostDetails: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    comments,
    loaded,
    hasError,
  } = useAppSelector(state => state.comments);
  const { selectedPost } = useAppSelector(state => state.selectedPost);

  const [visible, setVisible] = useState(false);

  function loadComments() {
    if (selectedPost) {
      dispatch(commentsActions.load(selectedPost?.id));
    }
  }

  useEffect(loadComments, [selectedPost?.id]);

  const addComment = async ({ name, email, body }: CommentData) => {
    if (selectedPost) {
      const newComment = await commentsApi.createComment({
        name,
        email,
        body,
        postId: selectedPost?.id,
      });

      dispatch(commentsActions.add(newComment));
    }
  };

  const deleteComment = async (commentId: number) => {
    dispatch(commentsActions.remove(commentId));

    await commentsApi.deleteComment(commentId);
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

        {loaded && !hasError && visible && (
          <NewCommentForm onSubmit={addComment} />
        )}
      </div>
    </div>
  );
};
