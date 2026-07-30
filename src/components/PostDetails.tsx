import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  fetchComments,
  removeComment,
} from '../features/comments/commentsSlice';

export const PostDetails: React.FC = () => {
  const [visible, setVisible] = useState(false);

  const dispatch = useAppDispatch();
  const postId = useAppSelector(state => state.selectedPost?.id);
  const post = useAppSelector(state => state.selectedPost);

  const { items, loaded, hasError } = useAppSelector(state => state.comments);

  useEffect(() => {
    if (postId) {
      setVisible(false);

      dispatch(fetchComments(postId));
    }
  }, [dispatch, postId]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${postId}: ${post?.title}`}</h2>

        <p data-cy="PostBody">{post?.body}</p>
      </div>

      <div className="block">
        {loaded && <Loader />}

        {hasError && !loaded && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {items.length === 0 && !loaded && !hasError && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {items.length > 0 && !loaded && !hasError && (
          <>
            <p className="title is-4">Comments:</p>

            {items.map(item => (
              <article
                className="message is-small"
                key={item.id}
                data-cy="Comment"
              >
                <div className="message-header">
                  <a href={`mailto:${item.email}`} data-cy="CommentAuthor">
                    {item.name}
                  </a>

                  <button
                    data-cy="CommentDelete"
                    type="button"
                    className="delete is-small"
                    aria-label="delete"
                    onClick={() => dispatch(removeComment(item.id))}
                  >
                    delete button
                  </button>
                </div>

                <div className="message-body" data-cy="CommentBody">
                  {item.body}
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

        {visible && !loaded && !hasError && <NewCommentForm />}
      </div>
    </div>
  );
};
