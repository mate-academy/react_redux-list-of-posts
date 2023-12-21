import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

import * as commentsApi from '../api/comments';

import { CommentData } from '../types/Comment';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  addComments,
  fetchComments,
  removeComment,
  setCommentsError,
} from '../features/comments';

export const PostDetails: React.FC = () => {
  const { comments, loading, error } = useAppSelector(state => state.comments);

  const post = useAppSelector(state => state.selectedPost);

  const dispatch = useAppDispatch();

  const [visible, setVisible] = useState(false);

  function loadComments() {
    setVisible(false);

    if (post) {
      dispatch(fetchComments(post.id));
    }
  }

  useEffect(loadComments, [post?.id]);

  const addComment = async ({ name, email, body }: CommentData) => {
    try {
      const newComment = await commentsApi.createComment({
        name,
        email,
        body,
        postId: post ? post.id : 0,
      });

      dispatch(addComments(newComment));
    } catch (isError) {
      dispatch(setCommentsError());
    }
  };

  const deleteComment = async (commentId: number) => {
    dispatch(removeComment(commentId));

    await commentsApi.deleteComment(commentId);
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">
          {`#${post ? post.id : 0}: ${post ? post.title : ''}`}
        </h2>

        <p data-cy="PostBody">
          {post ? post.body : ''}
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

        {!loading && !error && visible && (
          <NewCommentForm onSubmit={addComment} />
        )}
      </div>
    </div>
  );
};
