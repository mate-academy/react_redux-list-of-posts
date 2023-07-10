import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

import * as commentsApi from '../api/comments';

import { Post } from '../types/Post';
import { CommentData } from '../types/Comment';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import * as commentsActions from '../features/comments/commentsSlice';
import { commentsSelector } from '../helpers/funcState';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const dispatch = useAppDispatch();
  const {
    comments,
    loaded,
    hasError,
  } = useAppSelector(commentsSelector);
  const [visible, setVisible] = useState(false);

  function loadComments() {
    dispatch(commentsActions.setLoading(true));
    dispatch(commentsActions.setError(false));
    setVisible(false);

    commentsApi.getPostComments(post.id)
      .then(commentsFromServer => {
        return dispatch(commentsActions.getComments(commentsFromServer));
      })
      .catch(() => dispatch(commentsActions.setError(true)))
      .finally(() => dispatch(commentsActions.setLoading(false)));
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

      dispatch(commentsActions.addComment(newComment));
    } catch (error) {
      dispatch(commentsActions.setError(true));
    }
  };

  const handleClick = () => {
    setVisible(true);
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
        {loaded && (
          <Loader />
        )}

        {!loaded && hasError && (
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

            {comments.map(comment => {
              const deleteComment = async () => {
                await commentsApi.deleteComment(comment.id);

                dispatch(commentsActions.reset(comment.id));
              };

              return (
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
                      onClick={deleteComment}
                    >
                      delete button
                    </button>
                  </div>

                  <div className="message-body" data-cy="CommentBody">
                    {comment.body}
                  </div>
                </article>
              );
            })}
          </>
        )}

        {!loaded && !hasError && !visible && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={handleClick}
          >
            Write a comment
          </button>
        )}

        {!loaded && !hasError && visible && (
          <NewCommentForm onSubmit={addComment} />
        )}
      </div>
    </div>
  );
};
