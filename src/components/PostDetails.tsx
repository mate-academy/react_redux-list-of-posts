import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

import * as commentsApi from '../api/comments';

import { Comment, CommentData } from '../types/Comment';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import * as commentsActions from '../features/comments';

export const PostDetails: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const { selectedPost } = useAppSelector(state => state.posts);
  const { comments, loading, error } = useAppSelector(state => state.comments);
  const dispatch = useAppDispatch();

  function loadComments() {
    if (selectedPost) {
      setVisible(false);
      dispatch(commentsActions.init(selectedPost.id));
    }
  }

  useEffect(loadComments, [selectedPost, dispatch]);

  const addComment = async ({ name, email, body }: CommentData) => {
    if (selectedPost) {
      const newComment = await commentsApi.createComment({
        name,
        email,
        body,
        postId: selectedPost?.id,
      });

      const newPosts = (current: Comment[]) => {
        return [...current, newComment];
      };

      dispatch(commentsActions.setComments(newPosts(comments)));
    }
  };

  const deleteComment = async (commentId: number) => {
    const newComments = (current: Comment[]) => {
      return current.filter(
        comment => comment.id !== commentId,
      );
    };

    dispatch(commentsActions.setComments(newComments(comments)));

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
        {loading && (
          <Loader />
        )}

        {!loading && error && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {!loading && !error && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {!loading && !error && comments.length > 0 && (
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

        {!loading && !error && !visible && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setVisible(true)}
          >
            Write a comment
          </button>
        )}

        {(!loading && !error && visible) && (
          <NewCommentForm onSubmit={addComment} />
        )}
      </div>
    </div>
  );
};
