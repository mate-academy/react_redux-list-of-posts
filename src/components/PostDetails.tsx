import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';

import * as commentsApi from '../api/comments';

import { Post } from '../types/Post';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  add,
  initComments,
  remove,
  setError,
} from '../features/posts/comments';
import { CommentData } from '../types/Comment';
import { NewCommentForm } from './NewCommentForm';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const dispatch = useAppDispatch();
  const comments = useAppSelector(state => state.comments.items);
  const isLoaded = useAppSelector(state => state.comments.loading);
  const hasError = useAppSelector(state => state.comments.hasError);

  const [visible, setVisible] = useState(false);

  const noCommentsCondition = !isLoaded && !hasError && comments.length === 0;
  const showCommentsCondition = !isLoaded && !hasError && comments.length > 0;
  const buttonCondition = !isLoaded && !hasError && !visible;
  const formCondition = !isLoaded && !hasError && visible;

  function loadComments() {
    dispatch(initComments(post.id));
  }

  useEffect(loadComments, [post.id]);

  const addComment = async ({ name, email, body }: CommentData) => {
    try {
      const newComment = await commentsApi.createComment({
        name,
        email,
        body,
        postId: post.id,
      });

      dispatch(add(newComment));
    } catch (error) {
      dispatch(setError(true));
    }
  };

  const deleteComment = async (commentId: number) => {
    dispatch(remove(commentId));

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
        {isLoaded && (
          <Loader />
        )}

        {!isLoaded && hasError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {noCommentsCondition && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {showCommentsCondition && (
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

        {buttonCondition && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setVisible(true)}
          >
            Write a comment
          </button>
        )}

        {formCondition && (
          <NewCommentForm onSubmit={addComment} />
        )}
      </div>
    </div>
  );
};
