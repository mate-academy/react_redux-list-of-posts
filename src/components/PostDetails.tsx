import { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

import { Comment } from '../types/Comment';
import { LoadingStatus } from '../types/LoadingStatus';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  clearComments,
  deleteCommentAsync,
  getCommentsAsync,
} from '../features/comments/commentsSlice';

export const PostDetails = () => {
  const dispatch = useAppDispatch();

  const { selectedPost: post } = useAppSelector(state => state.posts);
  const { comments, status } = useAppSelector(state => state.comments);

  const isLoaded = status !== LoadingStatus.Loading;
  const hasError = status === LoadingStatus.Failed;

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(false);

    if (post) {
      dispatch(getCommentsAsync(post));
    } else {
      dispatch(clearComments());
    }
  }, [dispatch, post]);

  const deleteComment = async (comment: Comment) => {
    dispatch(deleteCommentAsync(comment));
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${post?.id}: ${post?.title}`}</h2>

        <p data-cy="PostBody">{post?.body}</p>
      </div>

      <div className="block">
        {!isLoaded && <Loader />}

        {isLoaded && hasError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {isLoaded && !hasError && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {isLoaded && !hasError && comments.length > 0 && (
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
                    onClick={() => deleteComment(comment)}
                  >
                    {/* delete button */}
                  </button>
                </div>

                <div className="message-body" data-cy="CommentBody">
                  {comment.body}
                </div>
              </article>
            ))}
          </>
        )}

        {isLoaded && !hasError && !isVisible && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setIsVisible(true)}
          >
            Write a comment
          </button>
        )}

        {isLoaded && !hasError && isVisible && <NewCommentForm />}
      </div>
    </div>
  );
};
