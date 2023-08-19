import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

import { CommentData } from '../types/Comment';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  fetchComments,
  postComment,
  removeComment,
} from '../features/commentsSlice';
import { Status } from '../types/Status';

export const PostDetails: React.FC = () => {
  const { selectedPost } = useAppSelector(state => state.selectedPost);
  const {
    comments,
    fetchingStatus,
  } = useAppSelector(state => state.comments);
  const dispatch = useAppDispatch();
  const { id, title, body } = selectedPost || {};
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchComments(id));
    }
  }, [id]);

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const addComment = async ({ name, email, body }: CommentData) => {
    if (id) {
      const newComment = {
        name,
        email,
        body,
        postId: id,
      };

      dispatch(postComment(newComment));
    }
  };

  const deleteComment = async (commentId: number) => {
    dispatch(removeComment(commentId));
  };

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
        {fetchingStatus === Status.Loading && (
          <Loader />
        )}

        {fetchingStatus === Status.Failed && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {fetchingStatus === Status.Idle && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {fetchingStatus === Status.Idle && comments.length > 0 && (
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

        {fetchingStatus === Status.Idle && !visible && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setVisible(true)}
          >
            Write a comment
          </button>
        )}

        {fetchingStatus === Status.Idle && visible && (
          <NewCommentForm onSubmit={addComment} />
        )}
      </div>
    </div>
  );
};
