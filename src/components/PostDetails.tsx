import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

import * as commentsApi from '../api/comments';

import { Post } from '../types/Post';
import { CommentData } from '../types/Comment';
import { useAppSelector } from '../app/hooks';
import { commentsSlice, fetchComments } from './Comments';
import { RootState } from '../app/store';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [visible, setVisible] = useState(false);

  const comments2 = useAppSelector(state => state.comments.value);
  const hasError2 = useAppSelector(state => state.comments.error);
  const loaded2 = useAppSelector(state => !state.comments.isLoading);

  const dispatch = useDispatch();
  const thunkDispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();

  useEffect(() => {
    setVisible(false);

    thunkDispatch(fetchComments(post.id));
  }, [post]);

  const addComment = async ({ name, email, body }: CommentData) => {
    try {
      const newComment = await commentsApi.createComment({
        name,
        email,
        body,
        postId: post.id,
      });

      dispatch(commentsSlice.actions.set([...comments2, newComment]));
    } catch (error) {
      throw new Error('somthing went wrong');
    }
  };

  const deleteComment = async (commentId: number) => {
    dispatch(commentsSlice.actions.set(comments2.filter(
      comment => comment.id !== commentId,
    )));
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
        {!loaded2 && (
          <Loader />
        )}

        {loaded2 && hasError2 && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {loaded2 && !hasError2 && comments2.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {loaded2 && !hasError2 && comments2.length > 0 && (
          <>
            <p className="title is-4">Comments:</p>

            {comments2.map(comment => (
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

        {loaded2 && !hasError2 && !visible && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setVisible(true)}
          >
            Write a comment
          </button>
        )}

        {loaded2 && !hasError2 && visible && (
          <NewCommentForm onSubmit={addComment} />
        )}
      </div>
    </div>
  );
};
