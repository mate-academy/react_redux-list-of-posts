import { FC, useEffect } from 'react';
import { CommentItem } from './CommentItem';
import { NewCommentForm } from './NewCommentForm';
import { Loader } from '../Loader';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getCommentsByPostId } from '../../app/slices/commentSlice';
import { setFormStatus } from '../../app/slices/uiSlice';

type Props = {
  postId: number;
};

export const CommentsList: FC<Props> = ({ postId }) => {
  const { comments, status } = useAppSelector(state => state.comment);
  const { isFormOpen } = useAppSelector(state => state.ui);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCommentsByPostId(postId));
  }, []);

  if (status === 'loading') {
    return <Loader />;
  }

  if (status === 'failed') {
    return (
      <div
        className="notification is-danger"
        data-cy="CommentsError"
      >
        Something went wrong
      </div>
    );
  }

  return (
    <>
      {comments.length > 0 && <p className="title is-4">Comments:</p>}

      {comments.length > 0 ? (
        comments.map(comment => (
          <CommentItem
            key={comment.id}
            comment={comment}
          />
        ))
      ) : (
        <p
          className="title is-4"
          data-cy="NoCommentsMessage"
        >
          No comments yet
        </p>
      )}
      {!isFormOpen && (
        <button
          data-cy="WriteCommentButton"
          type="button"
          className="button is-link"
          onClick={() => dispatch(setFormStatus(true))}
        >
          Write a comment
        </button>
      )}
      {isFormOpen && <NewCommentForm postId={postId} />}
    </>
  );
};
