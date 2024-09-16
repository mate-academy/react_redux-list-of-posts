import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

import { Post } from '../types/Post';
import { useDispatch } from 'react-redux';
import {
  deleteCommentById,
  deleteCommentLocally,
  fetchComments,
} from '../features/commentsSlice';
import { useAppSelector } from '../app/hooks';
import { LoadingStatuses } from '../enums/LoadingStatuses';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const { loading, idle, error } = LoadingStatuses;
  const { commentsLoadingStatus, comments } = useAppSelector(
    state => state.comments,
  );
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();

  const handleDelete = (commentId: number) => {
    dispatch(deleteCommentLocally(commentId));
    dispatch(deleteCommentById(commentId));
  };

  useEffect(() => {
    if (post.id) {
      dispatch(fetchComments(post.id));
    }
  }, [post.id]);

  const isLoading = commentsLoadingStatus === loading && !visible;
  const isError = commentsLoadingStatus === error;
  const isIdle = commentsLoadingStatus === idle;

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${post.id}: ${post.title}`}</h2>

        <p data-cy="PostBody">{post.body}</p>
      </div>

      <div className="block">
        {isLoading && <Loader />}

        {isError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {isIdle && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {isIdle && comments.length > 0 && (
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

        {isIdle && !visible && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setVisible(true)}
          >
            Write a comment
          </button>
        )}

        {isIdle && visible && <NewCommentForm postId={post.id} />}
      </div>
    </div>
  );
};
