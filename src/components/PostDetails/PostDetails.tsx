import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { NewCommentForm } from '../NewCommentForm/NewCommentForm';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import * as commentsActions from '../../features/commentsSlice';
import { Comment } from '../Comment';
import { Status } from '../../types/Status.enum';

export const PostDetails: React.FC = () => {
  const [visible, setVisible] = useState(false);

  const {
    comments,
    status,
  } = useAppSelector(state => state.comments);

  const { selectedPost } = useAppSelector(state => state.posts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (selectedPost) {
      dispatch(commentsActions.fetchComments(selectedPost.id));
    }

    setVisible(false);
  }, [selectedPost]);

  const setFormVisible = () => {
    setVisible(true);
  };

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
        {status === Status.LOADING && (
          <Loader />
        )}

        {status === Status.ERROR && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {status === Status.OK && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {status === Status.OK && comments.length > 0 && (
          <>
            <p className="title is-4">Comments:</p>

            {comments.map(comment => (
              <Comment key={comment.id} comment={comment} />
            ))}
          </>
        )}

        {status === Status.OK && !visible && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={setFormVisible}
          >
            Write a comment
          </button>
        )}

        {status === Status.OK && visible && selectedPost && (
          <NewCommentForm postId={selectedPost.id} />
        )}
      </div>
    </div>
  );
};
