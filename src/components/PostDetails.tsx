import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';

import { CommentData } from '../types/Comment';
import * as commentThunk from '../features/comments/commentsSlice';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

export const PostDetails = () => {
  const [visible, setVisible] = useState(false);
  const { selectedPost } = useAppSelector(store => store.selectedPost);
  const { comments, loaded, hasError } = useAppSelector(
    store => store.comments,
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    setVisible(false);

    if (selectedPost) {
      dispatch(commentThunk.initComments(selectedPost.id));
    }
  }, [selectedPost, dispatch]);

  const addComment = async ({ name, email, body }: CommentData) => {
    const newComment = {
      name,
      email,
      body,
      postId: selectedPost?.id || 0,
    };

    await dispatch(commentThunk.createComments(newComment));
  };

  const deleteComment = async (commentId: number) => {
    dispatch(commentThunk.deleteComment(commentId));
    await dispatch(commentThunk.deleteComments(commentId));
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${selectedPost?.id}: ${selectedPost?.title}`}</h2>

        <p data-cy="PostBody">{selectedPost?.body}</p>
      </div>

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

        {loaded && !hasError && visible && (
          <NewCommentForm onSubmit={addComment} />
        )}
      </div>
    </div>
  );
};
