import { FC } from 'react';
import { IComment } from '../../types/Comment';
import { useAppDispatch } from '../../app/hooks';
import * as commentsActions from '../../features/commentsSlice';

type Props = {
  comment: IComment;
};

export const Comment: FC<Props> = ({ comment }) => {
  const {
    id,
    body,
    email,
    name,
  } = comment;

  const dispatch = useAppDispatch();

  const deleteComment = async () => {
    dispatch(commentsActions.removeComment(id));
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
          onClick={deleteComment}
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
