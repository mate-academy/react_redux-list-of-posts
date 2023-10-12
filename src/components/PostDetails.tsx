import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Comment } from '../types/Comment';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  deleteCommentAsyncBy,
  getCommentsAsyncBy,
} from '../features/commentsSlice';

export const PostDetails: React.FC = () => {
  const [visibleComments, setVisibleComments] = useState<Comment[]>([]);
  const [visibleForm, setVisibleForm] = useState<boolean>(false);

  const {
    comments, isLoaded, isError,
  } = useAppSelector(state => state.comments);
  const { selectedPost } = useAppSelector(state => state.selectedPost);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setVisibleForm(false);

    if (selectedPost) {
      dispatch(getCommentsAsyncBy(selectedPost.id));
    }
  }, [selectedPost]);

  useEffect(() => {
    setVisibleComments(comments);
  }, [comments]);

  const deleteComment = async (commentId: number) => {
    const oldComments = comments;

    setVisibleComments(commnts => commnts
      .filter(comment => comment.id !== commentId));

    try {
      await dispatch(deleteCommentAsyncBy(commentId));
    } catch {
      setVisibleComments(oldComments);
    }
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        {selectedPost ? (
          <>
            <h2 data-cy="PostTitle">
              {`#${selectedPost.id}: ${selectedPost.title}`}
            </h2>

            <p data-cy="PostBody">
              {selectedPost.body}
            </p>
          </>
        ) : (
          <h2>
            Post did not find...
          </h2>
        )}
      </div>

      <div className="block">
        {!isLoaded && (
          <Loader />
        )}

        {isLoaded && isError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {isLoaded && !isError && visibleComments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {isLoaded && !isError && visibleComments.length > 0 && (
          <>
            <p className="title is-4">Comments:</p>

            {visibleComments.map(comment => (
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

        {isLoaded && !isError && !visibleForm && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setVisibleForm(true)}
          >
            Write a comment
          </button>
        )}

        {isLoaded && !isError && visibleForm && (
          <NewCommentForm />
        )}
      </div>
    </div>
  );
};
