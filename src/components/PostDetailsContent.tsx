/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import { loadCommentsAsync } from '../features/commentsSlice';
import { CommentItem } from './CommentItem';

export const PostDetailsContent = () => {
  const [isVisible, setIsVisible] = useState(false);

  const post = useAppSelector(state => state.selectedPost);
  const { comments, isLoading, hasError } = useAppSelector(
    state => state.comments,
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    setIsVisible(false);
    if (post) {
      dispatch(loadCommentsAsync(post.id));
    }
  }, [post?.id]);

  if (isLoading) {
    return <Loader />;
  }

  if (hasError) {
    return (
      <div className="notification is-danger" data-cy="CommentsError">
        Something went wrong
      </div>
    );
  }

  return (
    <>
      {!comments.length ? (
        <p className="title is-4" data-cy="NoCommentsMessage">
          No comments yet
        </p>
      ) : (
        <>
          <p className="title is-4">Comments:</p>

          {comments.map(comment => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </>
      )}

      {!isVisible && (
        <button
          data-cy="WriteCommentButton"
          type="button"
          className="button is-link"
          onClick={() => setIsVisible(true)}
        >
          Write a comment
        </button>
      )}

      {isVisible && <NewCommentForm />}
    </>
  );
};
