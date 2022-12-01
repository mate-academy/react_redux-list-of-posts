import React, { useState } from 'react';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  deleteComment,
  getError,
  getLoading,
  selectComments,
} from './Comments/commentsSlicer';
import { ErrorTypes, LoadingStatus } from '../types/enums';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const comments = useAppSelector(selectComments);
  const loading = useAppSelector(getLoading);
  const error = useAppSelector(getError);
  const dispatch = useAppDispatch();
  const [visible, setVisible] = useState(false);

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

        {loading === LoadingStatus.Failed
          && error === ErrorTypes.FailedToFetch
          && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

        {loading === LoadingStatus.Idle
          && error === ''
          && comments.length === 0
          && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

        {(loading === LoadingStatus.Idle || loading === LoadingStatus.Loading)
          && error === '' && comments.length > 0 && (
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
                    onClick={() => dispatch(
                      deleteComment(comment.id),
                    )}
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

        {loading === LoadingStatus.Idle && error === '' && !visible && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setVisible(true)}
          >
            Write a comment
          </button>
        )}

        {(loading === LoadingStatus.Idle || loading === LoadingStatus.Loading)
          && error === '' && visible && (
          <NewCommentForm />
        )}
      </div>
    </div>
  );
};
