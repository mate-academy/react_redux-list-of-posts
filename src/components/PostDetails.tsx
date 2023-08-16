import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  deleteComment,
  fetchComments,
  removeComment,
} from '../features/commentsSlice';

export const PostDetails: React.FC = () => {
  const [visible, setVisible] = useState(false);

  const { items, hasError, loaded } = useAppSelector((state) => state.comments);
  const { selectedPost } = useAppSelector((state) => state.posts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (selectedPost) {
      setVisible(false);
      dispatch(fetchComments(selectedPost.id));
    }
  }, [selectedPost?.id]);

  const handleDeleteComment = (commentId: number) => {
    dispatch(removeComment(commentId));
    dispatch(deleteComment(commentId));
  };

  return (
    <>
      {selectedPost ? (
        <div className="content" data-cy="PostDetails">
          <div className="block">
            <h2 data-cy="PostTitle">
              {`#${selectedPost.id}: ${selectedPost.title}`}
            </h2>

            <p data-cy="PostBody">{selectedPost.body}</p>
          </div>

          <div className="block">
            {loaded && !hasError && <Loader />}

            {!loaded && hasError && items.length === 0 && (
              <div className="notification is-danger" data-cy="CommentsError">
                Something went wrong
              </div>
            )}

            {!loaded && !hasError && items.length === 0 && (
              <p className="title is-4" data-cy="NoCommentsMessage">
                No comments yet
              </p>
            )}

            {!loaded && !hasError && items.length > 0 && (
              <>
                <p className="title is-4">Comments:</p>

                {items.map((comment) => (
                  <article
                    className="message is-small"
                    key={comment.id}
                    data-cy="Comment"
                  >
                    <div className="message-header">
                      <a
                        href={`mailto:${comment.email}`}
                        data-cy="CommentAuthor"
                      >
                        {comment.name}
                      </a>

                      <button
                        data-cy="CommentDelete"
                        type="button"
                        className="delete is-small"
                        aria-label="delete"
                        onClick={() => handleDeleteComment(comment.id)}
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

            {!loaded && !hasError && !visible && (
              <button
                data-cy="WriteCommentButton"
                type="button"
                className="button is-link"
                onClick={() => setVisible(true)}
              >
                Write a comment
              </button>
            )}

            {!loaded && !hasError && visible && <NewCommentForm />}
          </div>
        </div>
      ) : (
        <p>Choose a post</p>
      )}
    </>
  );
};
