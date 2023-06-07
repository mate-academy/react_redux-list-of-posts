import * as commentsActions from '../../features/commentsSlice';
import { useAppDispatch } from '../../app/hooks';
import { Comment } from '../../types/Comment';

type Props = {
  comment: Comment,
};

export const PostComment: React.FC<Props> = ({ comment }) => {
  const {
    id,
    email,
    name,
    body,
  } = comment;

  const dispatch = useAppDispatch();

  return (
    <article
      className="message is-small"
      key={id}
      data-cy="Comment"
    >
      <div className="message-header">
        <a href={`mailto:${email}`} data-cy="CommentAuthor">
          {name}
        </a>

        <button
          data-cy="CommentDelete"
          type="button"
          className="delete is-small"
          aria-label="delete"
          onClick={() => dispatch(commentsActions.removeComment(id))}
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
