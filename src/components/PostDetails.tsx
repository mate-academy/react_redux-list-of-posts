import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

import * as commentsApi from '../api/comments';
import { Post } from '../types/Post';
import { CommentData } from '../types/Comment';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  loadComents,
  addComment,
  deleteComment,
  setError,
} from '../features/post/postSlice';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({
  post: { id: postId, title, body: postBody },
}) => {
  const { selectedPostComments, isLoading, error } = useAppSelector(
    (state) => state.post,
  );
  const dispatch = useAppDispatch();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(false);
    dispatch(loadComents(postId));
  }, [postId]);

  const handleAdd = async ({ name, email, body }: CommentData) => {
    try {
      const newComment = await commentsApi.createComment({
        name,
        email,
        body,
        postId,
      });

      dispatch(addComment(newComment));
    } catch (err) {
      setError();
    }
  };

  const handleDelete = async (commentId: number) => {
    dispatch(deleteComment(commentId));

    await commentsApi.deleteComment(commentId);
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${postId}: ${title}`}</h2>

        <p data-cy="PostBody">{postBody}</p>
      </div>

      <div className="block">
        {isLoading && <Loader />}

        {!isLoading && error && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {!isLoading && !error && selectedPostComments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {!isLoading && !error && selectedPostComments.length > 0 && (
          <>
            <p className="title is-4">Comments:</p>

            {selectedPostComments.map(({
              id, email, name, body,
            }) => (
              <article className="message is-small" key={id} data-cy="Comment">
                <div className="message-header">
                  <a href={`mailto:${email}`} data-cy="CommentAuthor">
                    {name}
                  </a>

                  <button
                    data-cy="CommentDelete"
                    type="button"
                    className="delete is-small"
                    aria-label="delete"
                    onClick={() => handleDelete(id)}
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

        {!isLoading && !error && !visible && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setVisible(true)}
          >
            Write a comment
          </button>
        )}

        {!isLoading && !error && visible && (
          <NewCommentForm onSubmit={handleAdd} />
        )}
      </div>
    </div>
  );
};
