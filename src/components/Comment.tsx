import { useAppDispatch } from '../app/hooks';
import { Comment as CommentType } from '../types/Comment';
import {
  actions as commentsActions,
  deleteCommentFromServer,
} from '../features/comments';

type Props = {
  comment: CommentType;
};

export const Comment: React.FC<Props> = ({ comment }) => {
  const dispatch = useAppDispatch();

  const handleDeleteComment = (commentId: number) => {
    dispatch(commentsActions.deleteComment(commentId));
    dispatch(deleteCommentFromServer(commentId));
  };

  const { name, id, email, body } = comment;

  return (
    <article className="message is-small" key={id} data-cy="Comment">
      <div className="message-header">
        <a href={`mailto:${email}`} data-cy="CommentAuthor">
          {name}
        </a>

        <button
          data-cy="CommentDelete"
          type="button"
          className="delete is-small"
          aria-label="delete"
          onClick={() => handleDeleteComment(id)}
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
