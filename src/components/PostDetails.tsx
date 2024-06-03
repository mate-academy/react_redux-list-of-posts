import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import {
  useDeleteCommentMutation,
  useFetchPostCommentsQuery,
} from '../features/users/user-api-slice';
import { useAppSelector } from '../app/hooks';

export const PostDetails: React.FC = () => {
  const [visible, setVisible] = useState(false);

  const selectedPost = useAppSelector(state => state.select.post);
  const [deleteComment] = useDeleteCommentMutation();

  const {
    data: comments = [],
    isSuccess,
    isError,
    isLoading,
    refetch,
  } = useFetchPostCommentsQuery(selectedPost?.id);

  const handleDelete = async (commentId: number) => {
    await deleteComment(commentId);
    refetch();
  };

  useEffect(() => {
    setVisible(false);
  }, [selectedPost]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${selectedPost?.id}: ${selectedPost?.title}`}</h2>

        <p data-cy="PostBody">{selectedPost?.body}</p>
      </div>

      <div className="block">
        {isLoading && <Loader />}

        {isSuccess && isError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {isSuccess && !isError && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {isSuccess && !isError && comments.length > 0 && (
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
                    onClick={() => handleDelete(comment.id)}
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

        {isSuccess && !isError && !visible && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setVisible(true)}
          >
            Write a comment
          </button>
        )}

        {isSuccess && !isError && visible && <NewCommentForm />}
      </div>
    </div>
  );
};
