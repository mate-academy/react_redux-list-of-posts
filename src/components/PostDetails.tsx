/* eslint-disable @typescript-eslint/indent */
import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { loadPostComments, removeComment } from '../features/comments';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const dispatch = useAppDispatch();
  const comments = useAppSelector(state => state.comments);
  const selectedPost = useAppSelector(state => state.selectedPost);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (selectedPost) {
      setVisible(false);
      dispatch(loadPostComments(selectedPost.id));
    }
  }, [dispatch, selectedPost]);

  const { id, title, body } = post;

  const isLoading = comments.isCommetsLoading;
  const hasError = comments.errorMessageOnCommentsLoading.length > 0;
  const hasNoComments =
    comments.comments.length === 0 && !hasError && !isLoading;
  const hasComments = comments.comments.length > 0 && !hasError && !isLoading;

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${id}: ${title}`}</h2>
        <p data-cy="PostBody">{body}</p>
      </div>

      <div className="block">
        {isLoading && <Loader />}

        {hasError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {hasNoComments && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {hasComments && (
          <>
            <p className="title is-4">Comments:</p>
            {comments.comments.map(comment => (
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
                    disabled={comments.isCommetsLoading}
                    onClick={() => dispatch(removeComment(comment.id))}
                  />
                </div>

                <div className="message-body" data-cy="CommentBody">
                  {comment.body}
                </div>
              </article>
            ))}
          </>
        )}

        {!isLoading && !hasError && !visible && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setVisible(true)}
          >
            Write a comment
          </button>
        )}

        {!isLoading && !hasError && visible && <NewCommentForm />}
      </div>
    </div>
  );
};
