import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import * as commentsApi from '../api/comments';
import { Post } from '../types/Post';
import { CommentData } from '../types/Comment';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { clearComments, initComments } from '../features/commentsSlice';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const dispatch = useAppDispatch();
  const [visible, setVisible] = useState(false);

  const {
    items: comments,
    loaded,
    hasError,
  } = useAppSelector(state => state.comments);

  useEffect(() => {
    dispatch(initComments(post.id));
    setVisible(false);

    return () => {
      dispatch(clearComments());
    };
  }, [post.id, dispatch]);

  const addComment = async ({ name, email, body }: CommentData) => {
    try {
      await commentsApi.createComment({
        name,
        email,
        body,
        postId: post.id,
      });
      dispatch(initComments(post.id));
      setVisible(false);
    } catch (error) {}
  };

  const deleteComment = async (commentId: number) => {
    try {
      await commentsApi.deleteComment(commentId);
      dispatch(initComments(post.id));
    } catch (error) {}
  };

  return (
    <div className="content">
      <div className="block">
        <h2>{`#${post.id}: ${post.title}`}</h2>
        <p>{post.body}</p>
      </div>

      <div className="block">
        {!loaded && <Loader />}

        {loaded && hasError && (
          <div className="notification is-danger">Something went wrong</div>
        )}

        {loaded && !hasError && comments.length === 0 && (
          <p className="title is-4">No comments yet</p>
        )}

        {loaded && !hasError && comments.length > 0 && (
          <>
            <p className="title is-4">Comments:</p>

            {comments.map(comment => (
              <article className="message is-small" key={comment.id}>
                <div className="message-header">
                  <a href={`mailto:${comment.email}`}>{comment.name}</a>

                  <button
                    type="button"
                    className="delete is-small"
                    aria-label="delete"
                    onClick={() => deleteComment(comment.id)}
                  >
                    delete button
                  </button>
                </div>

                <div className="message-body">{comment.body}</div>
              </article>
            ))}
          </>
        )}

        {loaded && !hasError && !visible && (
          <button
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
