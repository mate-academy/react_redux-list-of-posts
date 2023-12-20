/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';

import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

import { useAppSelector, useAppDispatch } from '../app/hooks';
import { createComment, deleteComment } from '../api/comments';
import { fetchPostComments, addComment, removeComment } from '../features';

import { CommentData } from '../types';

export const PostDetails: React.FC = () => {
  const [visible, setVisible] = useState(false);

  const dispatch = useAppDispatch();

  const { selectedPost } = useAppSelector(state => state.selectedPost);
  const { items: comments, loaded, hasError } = useAppSelector(
    state => state.comments,
  );

  useEffect(() => {
    setVisible(false);
    // we clear the post when an author is changed
    // not to confuse the user
    if (selectedPost) {
      dispatch(fetchPostComments(selectedPost.id));
    }
  }, [selectedPost]);

  const handleAddComment = async ({ name, email, body }: CommentData) => {
    if (selectedPost) {
      const newComment = await createComment({
        name,
        email,
        body,
        postId: selectedPost.id,
      });

      dispatch(addComment(newComment));
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    dispatch(removeComment(commentId));

    await deleteComment(commentId);
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
                    onClick={() => handleDeleteComment(comment.id)}
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
          <NewCommentForm onSubmit={handleAddComment} />
        )}
      </div>
    </div>
  );
};
