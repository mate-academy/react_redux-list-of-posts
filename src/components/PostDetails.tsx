import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  deleteComents,
  fetchComments,
  removeComment,
} from '../features/commentsSlice';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const dispatch = useAppDispatch();
  const {
    items: comments,
    errorMessage,
    isLoading,
  } = useAppSelector(state => state.comments);

  const [visible, setVisible] = useState(false);

  const hasError = isLoading && errorMessage;
  const hasComments = isLoading && !errorMessage && !!comments.length;
  const hasNoComments = isLoading && !errorMessage && !comments.length;
  const visibleButton = isLoading && !errorMessage && !visible;
  const visibleForm = isLoading && !errorMessage && visible;

  useEffect(() => {
    dispatch(fetchComments(post.id));
    setVisible(false);
  }, [dispatch, post.id]);

  const handleDelete = (commentId: number) => {
    dispatch(removeComment(commentId));
    dispatch(deleteComents(commentId));
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${post.id}: ${post.title}`}</h2>

        <p data-cy="PostBody">{post.body}</p>
      </div>

      <div className="block">
        {!isLoading && <Loader />}

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

        {visibleButton && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setVisible(true)}
          >
            Write a comment
          </button>
        )}

        {visibleForm && <NewCommentForm />}
      </div>
    </div>
  );
};
