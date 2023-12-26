import React, { useEffect, useState } from 'react';
import { Post } from '../types/Post';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  deleteComment,
  fetchComments,
  removeComment,
} from '../features/commentsSlice';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [visible, setVisible] = useState(false);
  const dispatch = useAppDispatch();

  const {
    comments,
    isError,
    isLoading,
  } = useAppSelector(state => state.comments);

  useEffect(() => {
    dispatch(fetchComments(post.id));
    setVisible(false);
  }, [dispatch, post.id]);

  const handleCommentDelete = (commentId: number) => {
    dispatch(removeComment(commentId));
    dispatch(deleteComment(commentId));
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
        {!isLoading && (
          <Loader />
        )}

        {isLoading && isError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {isLoading && !isError && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {isLoading && !isError && comments.length > 0 && (
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
                    onClick={() => handleCommentDelete(comment.id)}
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

        {isLoading && !isError && !visible && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setVisible(true)}
          >
            Write a comment
          </button>
        )}

        {isLoading && !isError && visible && (
          <NewCommentForm />
        )}
      </div>
    </div>
  );
};
