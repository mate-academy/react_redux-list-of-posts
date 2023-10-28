import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  deleteComment,
  fetchComments,
  remove,
} from '../features/commentsSlice';

export const PostDetails: React.FC = () => {
  const dispatch = useAppDispatch();
  const post = useAppSelector(state => state.selectedPost.selectedPost);
  const comments = useAppSelector(state => state.comments.comments);
  const isLoading = useAppSelector(state => state.comments.isLoading);
  const hasError = useAppSelector(state => state.comments.hasError);
  const hasUpdateError = useAppSelector(
    state => state.comments.hasUpdatedError,
  );
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(false);
    if (post) {
      dispatch(fetchComments(post.id));
    }
  }, [post?.id]);

  const handleDeleteComment = (commentId: number) => {
    dispatch(deleteComment(commentId));
  };

  const isNoCommentsShown = !isLoading && !hasError && !comments.length;
  const isCommentsShown = !isLoading && !hasError && !!comments.length;

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
        {isLoading && (
          <Loader />
        )}

        {((!isLoading && hasError) || hasUpdateError) && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {isNoCommentsShown && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {isCommentsShown && (
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
                    onClick={() => handleDeleteComment(comment.id)}
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

        {!isLoading && !hasError && !visible && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setVisible(true)}
          >
            Write a comment
          </button>
        )}

        {!isLoading && !hasError && visible && (
          <NewCommentForm />
        )}

        {/* {hasUpdateError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )} */}
      </div>
    </div>
  );
};
