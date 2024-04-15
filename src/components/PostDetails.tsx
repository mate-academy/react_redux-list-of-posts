import React, { useEffect } from 'react';
import { Loader } from './Loader';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../app/store';
import {
  delets,
  getComments,
  setOpened,
  setSelectedComments,
} from './slices/CommentsSlice';
import { NewCommentForm } from './NewCommentForm';

export const PostDetails = () => {
  const loading = useSelector((state: RootState) => state.comments.loading);
  const post = useSelector((state: RootState) => state.userPosts.selectedPost);
  const comments = useSelector((state: RootState) => state.comments.comments);
  const hasError = useSelector((state: RootState) => state.comments.error);
  const opened = useSelector((state: RootState) => state.comments.opened);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (post?.id) {
      dispatch(getComments(post.id));
    }
  }, [post?.id]);

  const handleDeleteComent = (id: number) => {
    dispatch(delets(id));
    dispatch(setSelectedComments(id));
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${post?.id}: ${post?.title}`}</h2>

        <p data-cy="PostBody">{post?.body}</p>
      </div>

      <div className="block">
        {loading && <Loader />}

        {loading && hasError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {loading && !hasError && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {!hasError && comments.length > 0 && (
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
                      setSelectedComments(comment.id);
                      handleDeleteComent(comment.id);
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

        {!opened && !hasError && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => dispatch(setOpened(!opened))}
          >
            Write a comment
          </button>
        )}

        {opened && !hasError && <NewCommentForm />}
      </div>
    </div>
  );
};
