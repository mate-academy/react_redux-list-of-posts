import React, { useEffect } from 'react';
import { Loader } from './Loader';

import * as commentsActions from '../features/comments';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import { NewCommentForm } from './NewCommentForm';

export const PostDetails: React.FC = () => {
  // const [visible, setVisible] = useState(false);

  const { selectedPost } = useAppSelector(state => state.posts);
  const { error, loading, comments, visible } = useAppSelector(
    state => state.comments,
  );

  const postId = selectedPost?.id;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(commentsActions.actions.reset());

    if (postId) {
      dispatch(commentsActions.init(postId));
    }
  }, [postId, dispatch]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${postId}: ${selectedPost?.title}`}</h2>

        <p data-cy="PostBody">{selectedPost?.body}</p>
      </div>

      <div className="block">
        {loading && <Loader />}

        {!loading && error && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {!loading && !error && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {!loading && !error && comments.length > 0 && (
          <>
            <p className="title is-4">Comments:</p>

            {comments.map(comment => {
              return (
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
                      onClick={() =>
                        dispatch(commentsActions.removeComment(comment.id))
                      }
                    >
                      delete button
                    </button>
                  </div>

                  <div className="message-body" data-cy="CommentBody">
                    {comment.body}
                  </div>
                </article>
              );
            })}
          </>
        )}

        {!loading && !error && !visible && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => dispatch(commentsActions.actions.setVisible(true))}
          >
            Write a comment
          </button>
        )}

        {!loading && !error && visible && <NewCommentForm />}
      </div>
    </div>
  );
};
