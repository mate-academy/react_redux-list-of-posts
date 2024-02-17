import { useAppDispatch } from '../../app/hooks';
import { deleteComment } from '../../features/comments/comments';
import { Comment } from '../../types/Comment';

interface Props {
  comment: Comment;
}

export const CommentInfo: React.FC<Props> = ({ comment }) => {
  const dispatch = useAppDispatch();

  return (
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
          onClick={() => dispatch(deleteComment(comment.id))}
        >
          delete button
        </button>
      </div>

      <div className="message-body" data-cy="CommentBody">
        {comment.body}
      </div>
    </article>
  );
};
