import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

import * as commentsApi from '../api/comments';

import { Post } from '../types/Post';
import { CommentData } from '../types/Comment';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  addComment,
  deleteComment,
  commentsSelector,
  commentsStatusSelector,
  fetchPostComments,
} from '../slices/comments';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const comments = useAppSelector(commentsSelector);
  const status = useAppSelector(commentsStatusSelector);
  const dispatch = useAppDispatch();

  const [loaded, setLoaded] = useState(false);
  const [hasError, setError] = useState(false);
  const [visible, setVisible] = useState(false);

  const handleAddComment = async ({ name, email, body }: CommentData) => {
    try {
      const newComment = await commentsApi.createComment({
        name,
        email,
        body,
        postId: post.id,
      });

      dispatch(addComment(newComment));
    } catch (error) {
      setError(true);
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    try {
      dispatch(deleteComment(commentId));
      await commentsApi.deleteComment(commentId);
    } catch (e) {
      setError(true);
    }
  };

  useEffect(() => {
    dispatch(fetchPostComments(post.id));
    setVisible(false);
  }, [post.id]);

  useEffect(() => {
    switch (status) {
      case 'failed':
        setError(true);
        setLoaded(true);
        break;
      case 'loading':
        setError(false);
        setLoaded(false);
        break;
      default:
        setError(false);
        setLoaded(true);
        break;
    }
  }, [status]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">
          {`#${post.id}: ${post.title}`}
        </h2>

        <p data-cy="PostBody">
          {post.body}
        </p>
      </div>

      <div className="block">
        {!loaded && !hasError && (
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
