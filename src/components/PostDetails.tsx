import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchPostComments } from '../features/postComments';
import { CommentDetails } from './CommentDetails';

export const PostDetails: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const { selectedPost } = useAppSelector(state => state.selectedPost);
  const {
    items: postComments,
    loaded,
    hasError,
  } = useAppSelector(state => state.comments);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (selectedPost) {
      dispatch(fetchPostComments(selectedPost.id));
      setVisible(false);
    }
  }, [selectedPost, dispatch]);

  const isLoading = !loaded && !hasError;
  const hasComments = loaded && !hasError && postComments.length > 0;
  const noComments = loaded && !hasError && postComments.length === 0;

  if (!selectedPost) {
    return <h2 data-cy="PostTitle">There is no selected post</h2>;
  }

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${selectedPost.id}: ${selectedPost.title}`}</h2>

        <p data-cy="PostBody">{selectedPost.body}</p>
      </div>

      <div className="block">
        {isLoading && <Loader />}

        {hasError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {noComments && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {hasComments && (
          <>
            <p className="title is-4">Comments:</p>

            {postComments.map(comment => (
              <CommentDetails comment={comment} key={comment.id} />
            ))}
          </>
        )}

        {loaded && !hasError && !visible && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setVisible(true)}
          >
            Write a comment
          </button>
        )}

        {loaded && !hasError && visible && <NewCommentForm />}
      </div>
    </div>
  );
};
