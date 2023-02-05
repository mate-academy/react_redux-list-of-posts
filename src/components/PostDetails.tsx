import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectSelectedPost } from '../features/selectedPost/selectedPostSlice';
import {
  clear,
  loadComments,
} from '../features/comments/commentsSlice';
import { Comments } from './Comments';

export const PostDetails: React.FC = () => {
  const post = useAppSelector(selectSelectedPost);
  const dispatch = useAppDispatch();

  const [visible, setVisible] = useState(false);

  const [loaded, setLoaded] = useState(true);
  const [hasError, setError] = useState(false);

  useEffect(() => {
    setVisible(false);
    if (!post) {
      dispatch(clear());

      return;
    }

    setLoaded(false);
    dispatch(loadComments(post.id))
      .then(postsFromServer => {
        setError(postsFromServer.meta.requestStatus === 'rejected');
      })
      .finally(() => setLoaded(true));
  }, [post]);

  if (!post) {
    return null;
  }

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">
          {`#${post.id}: ${post.title}`}
        </h2>

        <p data-cy="PostBody">
          {post.body}
        </p>
      </div>

      <div className="block">
        {!loaded && (
          <Loader />
        )}

        {loaded && hasError ? (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        ) : (
          <Comments />
        )}

        {loaded && !hasError && !visible ? (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setVisible(true)}
          >
            Write a comment
          </button>
        ) : (
          <NewCommentForm currentPostId={post.id} />
        )}
      </div>
    </div>
  );
};
