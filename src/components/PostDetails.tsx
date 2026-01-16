import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import * as commentsApi from '../api/comments';

import { Post } from '../types/Post';
import { CommentData } from '../types/Comment';
import { RootState } from '../app/store';

import {
  startLoading,
  setComments,
  setError,
  addComment,
  removeComment,
  clearComments,
} from '../features/commentsSlice';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);

  const {
    items: comments,
    loaded,
    hasError,
  } = useSelector((state: RootState) => state.comments);

  useEffect(() => {
    setVisible(false);
    dispatch(clearComments());
    dispatch(startLoading());

    commentsApi
      .getPostComments(post.id)
      .then(commentsFromServer => dispatch(setComments(commentsFromServer)))
      .catch(() => dispatch(setError()));
  }, [post.id, dispatch]);

  const handleAddComment = async ({ name, email, body }: CommentData) => {
    try {
      const newComment = await commentsApi.createComment({
        name,
        email,
        body,
        postId: post.id,
      });

      dispatch(addComment(newComment));
    } catch {
      dispatch(setError());
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    dispatch(removeComment(commentId));
    await commentsApi.deleteComment(commentId);
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${post.id}: ${post.title}`}</h2>
        <p data-cy="PostBody">{post.body}</p>
      </div>

      <div className="block">
        {!loaded && <Loader />}

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
                key={comment.id}
                className="message is-small"
                data-cy="Comment"
              >
                <div className="message-header">
                  <a href={`mailto:${comment.email}`} data-cy="CommentAuthor">
                    {comment.name}
                  </a>

                  <button
                    type="button"
                    className="delete is-small"
                    data-cy="CommentDelete"
                    onClick={() => handleDeleteComment(comment.id)}
                  />
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
            type="button"
            className="button is-link"
            data-cy="WriteCommentButton"
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
