import { Comment, CommentData } from '../types/Comment';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

type PostDetailsCommentProps = {
  comments: Comment[];
  loaded: boolean;
  hasError: boolean;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  addComment: (commentData: CommentData) => Promise<void>;
  deleteComment: (commentId: number) => void;
};

export const PostDetailsComment: React.FC<PostDetailsCommentProps> = ({
  comments,
  loaded,
  hasError,
  visible,
  setVisible,
  addComment,
  deleteComment,
}) => (
  <div className="block">
    {!loaded && <Loader />}

    {loaded && hasError && (
      <div className="notification is-danger" data-cy="CommentsError">
        Something went wrong
      </div>
    )}

    {loaded && !hasError && comments.length === 0 && (
      <p className="title is-4" data-cy="NoCommentsMessage">
        No comments yet
      </p>
    )}

    {loaded && !hasError && comments.length > 0 && (
      <>
        <p className="title is-4">Comments:</p>

        {comments.map(comment => {
          const { id, name, body } = comment;

          return (
            <article className="message is-small" key={id} data-cy="Comment">
              <div className="message-header">
                <a href={`mailto:${comment.email}`} data-cy="CommentAuthor">
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
        })}
      </>
    )}

    {loaded && !hasError && !visible && (
      <button
        data-cy="WriteCommentButton"
        type="button"
        className="button is-link"
        onClick={() => setVisible(true)}
      >
        Write a comment
      </button>
    )}

    {loaded && !hasError && visible && <NewCommentForm onSubmit={addComment} />}
  </div>
);
