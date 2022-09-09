import React, { useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

import {
  useDeleteCommentByIdMutation,
  useGetCommentsByPostIdQuery,
} from '../features/api/commentsByPostId';
import { useGetPostByIdQuery } from '../features/api/postById';

type Props = {
  postId: number;
};

export const PostDetails: React.FC<Props> = ({ postId }) => {
  const [visible, setVisible] = useState(false);

  const {
    data: comments,
    isFetching,
    isError,
  } = useGetCommentsByPostIdQuery(postId,
    {
      refetchOnMountOrArgChange: true,
    });

  const { data: post } = useGetPostByIdQuery(postId);

  const [deleteComment] = useDeleteCommentByIdMutation();

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
        {isFetching && (
          <Loader />
        )}

        {!isFetching && isError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {!isFetching && !isError && comments?.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {!isFetching && !isError && comments && comments.length > 0 && (
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
                    onClick={() => {
                      deleteComment(comment.id);
                    }}
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

        {!isFetching && !isError && !visible && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setVisible(true)}
          >
            Write a comment
          </button>
        )}

        {!isFetching && !isError && visible && (
          <NewCommentForm postId={postId} />
        )}
      </div>
    </div>
  );
};
