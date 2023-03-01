import React, { useEffect, useState } from 'react';
import { NewCommentForm } from '../NewCommentForm/NewCommentForm';

import { Post } from '../../types/Post';
import { CommentData } from '../../types/Comment';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  addCommentAsync,
  getCommentsAsync,
  selectComments,
} from '../../features/comments/commentsSlice';
import { CommentsList } from '../CommentsList/CommentsList';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const { items: comments, loaded, hasError } = useAppSelector(selectComments);
  const dispatch = useAppDispatch();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(false);
    dispatch(getCommentsAsync(post.id));
  }, [post]);

  const addComment = async ({ name, email, body }: CommentData) => {
    await dispatch(addCommentAsync({
      name,
      email,
      body,
      postId: post.id,
    }));
  };

  const isFormOpen = loaded && !hasError && visible;
  const isFormClose = loaded && !hasError && !visible;

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
        <CommentsList
          comments={comments}
          loaded={loaded}
          hasError={hasError}
        />

        {isFormClose && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setVisible(true)}
          >
            Write a comment
          </button>
        )}

        {isFormOpen && (
          <NewCommentForm onSubmit={addComment} />
        )}
      </div>
    </div>
  );
};
