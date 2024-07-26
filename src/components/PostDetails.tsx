import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

import {
  removeComment,
  getComments,
  setFormVisibility,
} from './slices/CommentsSlice';

export const PostDetails: React.FC = () => {
  const dispatch = useAppDispatch();

  const post = useAppSelector(state => state.userPosts.selectedPost);
  const { loading, comments, error, formVisibility } = useAppSelector(
    state => state.comments,
  );

  //exclamation mark is used because the post will never be null
  //The whole component appears only when the post is selected
  useEffect(() => {
    dispatch(getComments(post!.id));
  }, [post!.id]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${post?.id}: ${post?.title}`}</h2>

        <p data-cy="PostBody">{post?.body}</p>
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
                    onClick={() => {
                      dispatch(removeComment(comment.id));
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

        {!loading && !formVisibility && !error && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => dispatch(setFormVisibility(!formVisibility))}
          >
            Write a comment
          </button>
        )}
        {!loading && !error && formVisibility && <NewCommentForm />}
      </div>
    </div>
  );
};
