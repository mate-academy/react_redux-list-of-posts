import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { NewCommentForm } from '../NewCommentForm';

import { Post } from '../../types/Post';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import * as commentsActions from '../../features/comments/comentsSlice';
import { CommentsList } from '../commentsList';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const comments = useAppSelector(state => state.coments.items);
  const loaded = useAppSelector(state => state.coments.loaded);
  const hasError = useAppSelector(state => state.coments.error);
  const dispatch = useAppDispatch();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(false);
    dispatch(commentsActions.init(post));
  }, [post.id]);

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

        {loaded
          && hasError
          && (
            <div className="notification is-danger" data-cy="CommentsError">
              {hasError}
            </div>
          )}

        {loaded
          && !hasError
          && comments.length === 0
          && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

        {loaded
          && !hasError
          && comments.length > 0
          && (
            <CommentsList />
          )}

        {loaded
          && !hasError
          && !visible
          && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setVisible(true)}
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
