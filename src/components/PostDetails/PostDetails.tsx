import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { NewCommentForm } from '../NewCommentForm';

import * as commentsActions from '../../features/commentsSlice';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { PostComment } from '../PostComment';

export const PostDetails: React.FC = () => {
  const [visible, setVisible] = useState(false);

  const dispatch = useAppDispatch();
  const { selectedPost } = useAppSelector(state => state.posts);
  const {
    comments,
    loading,
    error,
  } = useAppSelector(state => state.comments);

  function loadComments() {
    if (selectedPost) {
      dispatch(commentsActions.fetchComments(selectedPost.id));
    }

    setVisible(false);
  }

  useEffect(loadComments, [selectedPost?.id]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">
          {`#${selectedPost?.id}: ${selectedPost?.title}`}
        </h2>

        <p data-cy="PostBody">
          {selectedPost?.body}
        </p>
      </div>

      <div className="block">
        {!loading && (
          <Loader />
        )}

        {loading && error && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {loading && !error && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {loading && !error && comments.length > 0 && (
          <>
            <p className="title is-4">Comments:</p>

            {comments.map(comment => (
              <PostComment
                comment={comment}
                key={comment.id}
              />
            ))}
          </>
        )}

        {loading && !error && !visible && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setVisible(true)}
          >
            Write a comment
          </button>
        )}

        {loading && !error && visible && selectedPost && (
          <NewCommentForm postId={selectedPost.id} />
        )}
      </div>
    </div>
  );
};
