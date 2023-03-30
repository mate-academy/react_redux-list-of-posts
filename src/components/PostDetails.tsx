import React from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { useAppDispatch, useAppSelector } from '../app/hooks';

import * as commentsApi from '../api/comments';
import * as commentsActions from '../features/commentSlice';

export const PostDetails: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    comments: rComments,
    loaded: rLoaded,
    error: rError,
    visible: rVisible,
  } = useAppSelector((state) => state.comments);
  const { post } = useAppSelector(state => state.posts);

  const deleteComment = async (commentId: number) => {
    // we delete the comment immediately so as
    // not to make the user wait long for the actual deletion
    // setComments((currentComments) =>
    //   // eslint-disable-next-line implicit-arrow-linebreak
    //   currentComments.filter((comment) => comment.id !== commentId));

    dispatch(commentsActions.removeComment(commentId));

    await commentsApi.deleteComment(commentId);
  };

  return (
    <div className="content" data-cy="PostDetails">
      {!!post && (
        <div className="block">
          <h2 data-cy="PostTitle">{`#${post.id}: ${post.title}`}</h2>

          <p data-cy="PostBody">{post.body}</p>
        </div>
      )}

      <div className="block">
        {!rLoaded && <Loader />}

        {rLoaded && rError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {rLoaded && !rError && rComments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {rLoaded && !rError && rComments.length > 0 && (
          <>
            <p className="title is-4">Comments:</p>

            {rComments.map((comment) => (
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

        {rLoaded && !rError && !rVisible && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => dispatch(commentsActions.changeVisible(true))}
          >
            Write a comment
          </button>
        )}

        {rLoaded && !rError && rVisible && (
          <NewCommentForm />
        )}
      </div>
    </div>
  );
};
