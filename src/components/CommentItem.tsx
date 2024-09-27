import { useAppDispatch } from '../app/hooks';
import { deleteCommentAsync } from '../features/commentsSlice';
import { Comment } from '../types/Comment';

type Props = {
  comment: Comment;
};
export const CommentItem: React.FC<Props> = ({ comment }) => {
  const dispatch = useAppDispatch();
  const deleteComment = async (commentId: number) => {
    dispatch(deleteCommentAsync(commentId));
  };

  return (
    <article className="message is-small" data-cy="Comment">
      <div className="message-header">
        <a href={`mailto:${comment.email}`} data-cy="CommentAuthor">
          {comment.name}
        </a>

        <button
          data-cy="CommentDelete"
          type="button"
          className="delete is-small"
          aria-label="delete"
          onClick={() => deleteComment(comment.id)}
        ></button>
      </div>

      <div className="message-body" data-cy="CommentBody">
        {comment.body}
      </div>
    </article>
  );
};
