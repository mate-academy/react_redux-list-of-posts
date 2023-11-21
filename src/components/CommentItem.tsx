import { Comment } from '../types/Comment';
import {
  removeChoosenComment,
  removeComment,
} from '../slices/commentsSlice';
import { useAppDispatch } from '../app/hooks';

type Props = {
  comment: Comment
};

export const CommentItem: React.FC<Props> = ({ comment }) => {
  const {
    id, name, body, email,
  } = comment;
  const dispatch = useAppDispatch();

  const deleteComment = async (commentId: number) => {
    dispatch(removeComment(commentId));
    await dispatch(removeChoosenComment(commentId));
  };

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
          onClick={() => deleteComment(id)}
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
