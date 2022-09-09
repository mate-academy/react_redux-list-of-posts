import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

import * as commentsApi from '../api/comments';

import { Post } from '../types/Post';
import { CommentData } from '../types/Comment';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  setComments,
  fetchComments,
  setCommentsError,
} from '../features/currentPostSlice';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const comments = useAppSelector(state => (
    state.currentPostState.comments[post.id] || []
  ));
  const {
    commentsIsLoading,
    commentsIsError,
  } = useAppSelector(state => state.currentPostState);
  const [visible, setVisible] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchComments(post.id));
    setVisible(false);
  }, [post.id]);

  const addComment = async ({ name, email, body }: CommentData) => {
    try {
      const newComment = await commentsApi.createComment({
        name,
        email,
        body,
        postId: post.id,
      });

      dispatch(setComments({ id: post.id, data: [...comments, newComment] }));
    } catch (error) {
      dispatch(setCommentsError(true));
    }
  };

  const deleteComment = async (commentId: number) => {
    const commentsData = comments.filter(comment => comment.id !== commentId);

    dispatch(setComments({
      id: post.id,
      data: commentsData,
    }));

    await commentsApi.deleteComment(commentId);
  };

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
        {commentsIsLoading && comments.length === 0 && (
          <Loader />
        )}

        {!commentsIsLoading && commentsIsError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {!commentsIsLoading && !commentsIsError && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {!commentsIsLoading && !commentsIsError && comments.length > 0 && (
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

        {!commentsIsLoading && !commentsIsError && !visible && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setVisible(true)}
          >
            Write a comment
          </button>
        )}

        {!commentsIsLoading && !commentsIsError && visible && (
          <NewCommentForm onSubmit={addComment} />
        )}
      </div>
    </div>
  );
};
