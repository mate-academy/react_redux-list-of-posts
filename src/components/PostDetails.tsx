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

import { selectComments, selectPosts } from '../app/selectors';

export const PostDetails = () => {
  const dispatch = useAppDispatch();

  const { selectedPost: post } = useAppSelector(selectPosts);
  const { comments, batchStatus } = useAppSelector(selectComments);

  const isLoading = batchStatus === LoadingStatus.Loading;
  const isError = batchStatus === LoadingStatus.Failed;
  const isFine = batchStatus === LoadingStatus.Idle;

  const hasComments = Boolean(comments.length);

  const [isCommentFormVisible, setIsCommentFormVisible] = useState(false);

  useEffect(() => {
    setIsCommentFormVisible(false);

    if (post) {
      dispatch(getCommentsAsync(post));
    } else {
      dispatch(clearComments());
    }
  }, [dispatch, post]);

  const deleteComment = async (comment: Comment) => {
    dispatch(deleteCommentAsync(comment));
  };

  const showCommentForm = () => {
    setIsCommentFormVisible(true);
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${post?.id}: ${post?.title}`}</h2>

        <p data-cy="PostBody">{post?.body}</p>
      </div>

      <div className="block">
        {isLoading && <Loader />}

        {isError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {isFine && !hasComments && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {isFine && hasComments && (
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
                  />
                </div>

                <div className="message-body" data-cy="CommentBody">
                  {comment.body}
                </div>
              </article>
            ))}
          </>
        )}

        {isFine && !isCommentFormVisible && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={showCommentForm}
          >
            Write a comment
          </button>
        )}

        {isFine && isCommentFormVisible && <NewCommentForm />}
      </div>
    </div>
  );
};
