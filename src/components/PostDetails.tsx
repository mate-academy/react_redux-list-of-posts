import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { useAppSelector } from '../app/hooks';
import {
  useGetCommentsQuery,
  useClearCommentMutation,
} from '../features/comments/commentsApi';

export const PostDetails: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const { selectedPost: post } = useAppSelector(state => state.selectedPost);
  const [clearComment] = useClearCommentMutation();

  const {
    data: comments = [],
    isLoading,
    isError,
  } = useGetCommentsQuery(post?.id || 0);

  useEffect(() => {
    setVisible(false);
  }, [post?.id]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">
          {`#${post?.id}: ${post?.title}`}
        </h2>

        <p data-cy="PostBody">
          {post?.body}
        </p>
      </div>

      <div className="block">
        {isLoading && (
          <Loader />
        )}

        {isError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {!isLoading && !isError && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {!isLoading && !isError && comments.length > 0 && (
          <>
            <p className="title is-4">Comments:</p>

            {comments.map(({ id, name, email, body }) => (
              <article
                className="message is-small"
                key={id}
                data-cy="Comment"
              >
                <div className="message-header">
                  <a href={`mailto:${email}`} data-cy="CommentAuthor">
                    {name}
                  </a>

                  <button
                    data-cy="CommentDelete"
                    type="button"
                    className="delete is-small"
                    aria-label="delete"
                    onClick={
                      () => {
                        clearComment(id);
                      }
                    }
                  >
                    delete button
                  </button>
                </div>

                <div className="message-body" data-cy="CommentBody">
                  {body}
                </div>
              </article>
            ))}
          </>
        )}

        {!isLoading && !isError && !visible && comments && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setVisible(true)}
          >
            Write a comment
          </button>
        )}

        {!isLoading && !isError && visible && (
          <NewCommentForm />
        )}
      </div>
    </div>
  );
};
