import { useEffect, useState } from 'react';
import classNames from 'classnames';

import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { commentsApiActions } from '../features/comments';

export const PostDetails = () => {
  const [visible, setVisible] = useState(false);

  const dispatch = useAppDispatch();
  const { isLoading, hasError, comments } = useAppSelector(
    state => state.comments,
  );
  const { selectedPost } = useAppSelector(state => state.posts);

  useEffect(() => {
    setVisible(false);

    if (selectedPost?.id) {
      dispatch(commentsApiActions.loadComments(selectedPost?.id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPost?.id]);

  return (
    <>
      <div
        data-cy="Sidebar"
        className={classNames('tile', 'is-parent', 'is-8-desktop', 'Sidebar', {
          'Sidebar--open': selectedPost,
        })}
      >
        {selectedPost && (
          <div className="tile is-child box is-success ">
            <div className="content" data-cy="PostDetails">
              <div className="block">
                <h2 data-cy="PostTitle">{`#${selectedPost.id}: ${selectedPost.title}`}</h2>

                <p data-cy="PostBody">{selectedPost.body}</p>
              </div>

              <div className="block">
                {isLoading && <Loader />}

                {!isLoading && hasError && (
                  <div
                    className="notification is-danger"
                    data-cy="CommentsError"
                  >
                    Something went wrong
                  </div>
                )}

                {!isLoading && !hasError && !comments.length && (
                  <p className="title is-4" data-cy="NoCommentsMessage">
                    No comments yet
                  </p>
                )}

                {!isLoading && !hasError && !!comments.length && (
                  <>
                    <p className="title is-4">Comments:</p>

                    {comments.map(comment => (
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
                            onClick={() =>
                              dispatch(
                                commentsApiActions.deleteComment(comment.id),
                              )
                            }
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

                {!isLoading && !hasError && !visible && (
                  <button
                    data-cy="WriteCommentButton"
                    type="button"
                    className="button is-link"
                    onClick={() => setVisible(true)}
                  >
                    Write a comment
                  </button>
                )}

                {!isLoading && !hasError && visible && <NewCommentForm />}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
