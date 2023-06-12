import { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import * as selectedPostActions from '../features/postDetail/postDetailSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { Status } from '../types/Status';

export const PostDetails = () => {
  const selectedPost = useAppSelector(selectedPostActions.selectedPost);
  const { postComments } = useAppSelector(state => state.selectedPost);
  const { status } = useAppSelector(state => state.selectedPost);
  const dispatch = useAppDispatch();
  const [visible, setVisible] = useState(false);

  const loading = status === Status.loading;
  const hasError = status === Status.failed;

  useEffect(() => {
    if (selectedPost) {
      dispatch(selectedPostActions.loadPostCommentsAsync(selectedPost.id));
    } else {
      dispatch(selectedPostActions.clearPostComments());
    }
  }, [selectedPost?.id]);

  const deleteComment = async (commentId: number) => {
    dispatch(selectedPostActions.deleteCommentAsync(commentId));
    dispatch(selectedPostActions.deleteCommentById(commentId));
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">
          {selectedPost && `#${selectedPost.id}: ${selectedPost.title}`}
        </h2>

        <p data-cy="PostBody">
          {selectedPost?.body}
        </p>
      </div>

      <div className="block">
        {loading && !hasError && (
          <Loader />
        )}

        {!loading && hasError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {!loading && !hasError && !postComments.length && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {!loading && !hasError && !!postComments.length && (
          <>
            <p className="title is-4">Comments:</p>

            {postComments.map(comment => (
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
                    onClick={() => {
                      deleteComment(comment.id);
                    }}
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

        {!loading && !hasError && !visible && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setVisible(true)}
          >
            Write a comment
          </button>
        )}

        {!loading && !hasError && visible && (
          <NewCommentForm />
        )}
      </div>
    </div>
  );
};
