import React, { useEffect } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

import * as commentsApi from '../api/comments';

import { Post } from '../types/Post';
import { CommentData } from '../types/Comment';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  init as commentsInit, deleteComment,
  setError, setNewComment, setVisibleNewForm
} from '../features/comments/commentsSlice';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const {
    comments, loaded, hasError, visibleNewForm
  } = useAppSelector(state => state.comments);
  const dispatch = useAppDispatch();

  function loadComments() {
    dispatch(commentsInit(post.id));
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

      dispatch(setNewComment(newComment));
    } catch (error) {
      dispatch(setError(true));
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    await dispatch(deleteComment(commentId));
  };

  const handleOpenNewCommentForm = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();

    dispatch(setVisibleNewForm(true));
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${post.id}: ${post.title}`}</h2>

        <p data-cy="PostBody">{post.body}</p>
      </div>

      <div className="block">
        {loaded && <Loader />}

        {loaded && hasError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {!loaded && !hasError && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {!loaded && !hasError && comments.length > 0 && (
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

        {!loaded && !hasError && comments.length >= 0 && !visibleNewForm && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={handleOpenNewCommentForm}
          >
            Write a comment
          </button>
        )}

        {visibleNewForm && !hasError && (
          <NewCommentForm onSubmit={addComment} />
        )}
      </div>
    </div>
  );
};
