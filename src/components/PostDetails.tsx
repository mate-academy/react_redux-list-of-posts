import React, { useEffect } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  getCommentsAsync,
  setVisible,
  deleteCommentsAsync,
} from '../features/commentSlice/commentSlice';

export const PostDetails: React.FC = () => {
  const { selectedPost: post } = useAppSelector(state => state.posts);
  const {
    comments, loaded, hasError, visible,
  } = useAppSelector(state => state.comments);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (post) {
      dispatch(getCommentsAsync(post.id));
    }
  }, [post?.id]);

  return (
    <div className="content">
      <div className="block">
        <h2>
          {`#${post?.id}: ${post?.title}`}
        </h2>
        <p>{post?.body}</p>
      </div>

      <div className="block">
        {!loaded && <Loader />}

        {loaded && hasError && (
          <div className="notification is-danger">
            Something went wrong
          </div>
        )}

        {loaded && !hasError && comments.length === 0 && (
          <p className="title is-4">No comments yet</p>
        )}

        {loaded && !hasError && comments.length > 0 && (
          <>
            <p className="title is-4">Comments:</p>

            {comments.map(comment => (
              <article className="message is-small" key={comment.id}>
                <div className="message-header">
                  <a href={`mailto:${comment.email}`}>
                    {comment.name}
                  </a>

                  <button
                    type="button"
                    className="delete is-small"
                    aria-label="delete"
                    onClick={() => dispatch(deleteCommentsAsync(comment.id))}
                  >
                    delete button
                  </button>
                </div>

                <div className="message-body">
                  {comment.body}
                </div>
              </article>
            ))}
          </>
        )}

        {loaded && !hasError && !visible && (
          <button
            type="button"
            className="button is-link"
            onClick={() => dispatch(setVisible())}
          >
            Write a comment
          </button>
        )}

        {loaded && !hasError && visible && (
          <NewCommentForm />
        )}
      </div>
    </div>
  );
};
