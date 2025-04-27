import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

import { useAppSelector } from '../app/hooks';
import {
  useDeleteCommentMutation,
  useGetPostCommentsQuery,
} from '../api/apiRTKQuery';

type Props = {};

export const PostDetails: React.FC<Props> = () => {
  const selectedPost = useAppSelector(state => state.selectedPost.selectedPost);
  const selectedPostId = selectedPost?.id ?? 0;
  const {
    data: comments = [],
    isLoading,
    isError,
    isSuccess,
  } = useGetPostCommentsQuery(selectedPostId, {
    skip: !selectedPost,
  });
  const [visible, setVisible] = useState(false);
  const [deleteComment] = useDeleteCommentMutation();

  useEffect(() => {
    setVisible(false);
  }, [selectedPostId]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${selectedPost?.id}: ${selectedPost?.title}`}</h2>

        <p data-cy="PostBody">{selectedPost?.body}</p>
      </div>

      <div className="block">
        {isLoading && <Loader />}

        {isError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {isSuccess && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {isSuccess && comments.length > 0 && (
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
                    onClick={() =>
                      deleteComment({
                        commentId: comment.id,
                        postId: selectedPostId,
                      })
                    }
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

        {isSuccess && !visible && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setVisible(true)}
          >
            Write a comment
          </button>
        )}

        {isSuccess && visible && <NewCommentForm />}
      </div>
    </div>
  );
};
