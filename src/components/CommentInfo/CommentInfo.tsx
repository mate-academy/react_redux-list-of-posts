import { Comment } from '../../types/Comment';
import { useAppDispatch } from '../../app/hooks';
import {
  deleteComment,
  setDeletingComment,
} from '../../features/commentsSlice';

interface Props {
  comment: Comment,
}

export const CommentInfo: React.FC<Props> = ({ comment }) => {
  const {
    name,
    email,
    body,
    id,
  } = comment;
  const dispatch = useAppDispatch();

  const handleDeleteComment = () => {
    dispatch(setDeletingComment(comment));
    dispatch(deleteComment(id));
  };

  return (
    <article className="message is-small" data-cy="Comment">
      <div className="message-header">
        <a href={`mailto:${email}`} data-cy="CommentAuthor">
          {name}
        </a>
        <button
          onClick={() => handleDeleteComment()}
          data-cy="CommentDelete"
          type="button"
          className="delete is-small"
          aria-label="delete"
        >
          delete button
        </button>
      </div>

      <div className="message-body" data-cy="CommentBody">
        {body}
      </div>
    </article>
  );
};
