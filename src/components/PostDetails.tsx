import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  commentsSlice,
  fetchComments,
  removeComment,
} from '../features/slices/commentsSlice';

export const PostDetails: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const {
    hasError,
    items: comments,
    loaded,
  } = useAppSelector(state => state.comments);
  const { selectedPost } = useAppSelector(state => state.selectedPost);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (selectedPost) {
      dispatch(fetchComments(selectedPost.id));
    }

    setVisible(false);
  }, [selectedPost]);

  const deleteComment = async (commentId: number) => {
    dispatch(commentsSlice.actions.removeComment(commentId));
    dispatch(removeComment(commentId));
  };

  const { id, title, body } = selectedPost || {};

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">
          {`#${id}: ${title}`}
        </h2>

        <p data-cy="PostBody">
          {body}
        </p>
      </div>

      <div className="block">
        {!loaded && (
          <Loader />
        )}
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
              const {
                email, name, id: commentId, body: commentBody,
              } = comment;

              return (
                <article
                  className="message is-small"
                  key={commentId}
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
                      onClick={() => deleteComment(commentId)}
                    >
                      delete button
                    </button>
                  </div>

                  <div className="message-body" data-cy="CommentBody">
                    {commentBody}
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

        {selectedPost && loaded && !hasError && visible && (
          <NewCommentForm />
        )}
      </div>
    </div>
  );
};
