import { FC } from 'react';
import { Comment } from '../../types/Comment';
import { useAppDispatch } from '../../app/hooks';
import {
  deleteCommentById,
  filterComment,
} from '../../app/slices/commentSlice';

type Props = {
  comment: Comment;
};
export const CommentItem: FC<Props> = ({ comment }) => {
  const dispatch = useAppDispatch();

  const onDelete = () => {
    dispatch(filterComment(comment));
    dispatch(deleteCommentById(comment.id));
  };

  return (
    <article
      className="message is-small"
      data-cy="Comment"
    >
      <div className="message-header">
        <a
          href={`mailto:${comment.email}`}
          data-cy="CommentAuthor"
        >
          {comment.name}
        </a>
        <button
          data-cy="CommentDelete"
          type="button"
          className="delete is-small"
          aria-label="delete"
          onClick={onDelete}
        >
          delete button
        </button>
      </div>

      <div
        className="message-body"
        data-cy="CommentBody"
      >
        {comment.body}
      </div>
    </article>
  );
};
