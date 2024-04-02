import { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { CommentData } from '../types/Comment';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { init, create, remove, removeComment } from '../features/comments';

export const PostDetails = () => {
  const dispatch = useAppDispatch();
  const [visible, setVisible] = useState(false);
  const { selectedPost } = useAppSelector(state => state.selectedPost);
  const { comments, loaded, hasError } = useAppSelector(
    state => state.comments,
  );
  const isLoading = !loaded;
  const isError = loaded && hasError;
  const noComments = loaded && !hasError && comments.length === 0;
  const hasComments = loaded && !hasError && comments.length > 0;
  const showWriteCommentButton = loaded && !hasError && !visible;
  const showNewCommentForm = loaded && !hasError && visible;

  useEffect(() => {
    setVisible(false);

    if (selectedPost) {
      dispatch(init(selectedPost.id));
    }
  }, [dispatch, selectedPost]);

  const addComment = async ({ name, email, body }: CommentData) => {
    await dispatch(
      create({
        name,
        email,
        body,
        postId: selectedPost?.id || 0,
      }),
    );
  };

  const deleteComment = async (commentId: number) => {
    dispatch(removeComment(commentId));
    await dispatch(remove(commentId));
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${selectedPost?.id}: ${selectedPost?.title}`}</h2>

        <p data-cy="PostBody">{selectedPost?.body}</p>
      </div>

      <div className="block">
        {isLoading && <Loader />}

        {isError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {noComments && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {hasComments && (
          <>
            <p className="title is-4">Comments:</p>

            {comments.map(comment => (
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
                    onClick={() => deleteComment(comment.id)}
                  >
                    delete button
                  </button>
                </div>

                <div className="message-body" data-cy="CommentBody">
                  {comment.body}
                </div>
              </article>
            ))}
          </>
        )}

        {showWriteCommentButton && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setVisible(true)}
          >
            Write a comment
          </button>
        )}

        {showNewCommentForm && <NewCommentForm onSubmit={addComment} />}
      </div>
    </div>
  );
};
