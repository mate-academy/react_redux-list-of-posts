import React, { useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

import { Post } from '../types/Post';
import { clientAPI } from '../store/clientApi';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const {
    data: comments = [],
    isLoading,
    isError,
  } = clientAPI.useFetchAllCommentsQuery(post.id);
  const [
    deleteComment,
    { isLoading: updateAfterDelete },
  ] = clientAPI.useDeleteCommentMutation();
  const [visible, setVisible] = useState(false);

  return (
    <div className="content">
      <div className="block">
        <h2>
          {`#${post.id}: ${post.title}`}
        </h2>
        <p>{post.body}</p>
      </div>

      <div className="block">
        {(isLoading || updateAfterDelete) && <Loader />}

        {!isLoading && isError && (
          <div className="notification is-danger">
            Something went wrong
          </div>
        )}

        {!isLoading
          && !isError
          && comments.length === 0
          && !updateAfterDelete
          && (
            <p className="title is-4">No comments yet</p>
          )}

        {!isLoading
          && !isError
          && comments.length > 0
          && !updateAfterDelete
          && (
            <>
              <p className="title is-4">Comments:</p>

              {comments.map(comment => (
                <article className="message is-small" key={comment.id}>
                  <div className="message-header">
                    <a href={`mailto:${comment.email}`}>
                      {comment.name}
                    </a>

                    <button
                      type="button"
                      className="delete is-small"
                      aria-label="delete"
                      onClick={() => deleteComment(comment.id)}
                    >
                      delete button
                    </button>
                  </div>

                  <div className="message-body">
                    {comment.body}
                  </div>
                </article>
              ))}
            </>
          )}

        {!isLoading
          && !isError
          && !visible
          && !updateAfterDelete
          && (
            <button
              type="button"
              className="button is-link"
              onClick={() => setVisible(true)}
            >
              Write a comment
            </button>
          )}

        {!isLoading
        && !isError
        && visible
        && !updateAfterDelete
        && (
          <NewCommentForm />
        )}
      </div>
    </div>
  );
};
