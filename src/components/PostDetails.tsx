import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchComments } from '../slices/commentsSlice';
import { CommentItem } from './CommentItem';

export const PostDetails: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, loaded, hasError } = useAppSelector(state => state.comments);
  const [visible, setVisible] = useState(false);
  const { selectedPost } = useAppSelector(state => (
    state.selectedPost));
  const { id, title, body } = selectedPost || {};
  const noCommentsFound = loaded && !hasError && items.length === 0;

  useEffect(() => {
    if (id) {
      dispatch(fetchComments(id));
    }

    setVisible(false);
  }, [id]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">
          {`#${id}: ${title}`}
        </h2>

        <p data-cy="PostBody">
          {body}
        </p>
      </div>

      <div className="block">
        {!loaded && (
          <Loader />
        )}

        {loaded && hasError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {noCommentsFound && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {loaded && !hasError && items.length > 0 && (
          <>
            <p className="title is-4">Comments:</p>

            {items.map(comment => (
              <CommentItem key={comment.id} comment={comment} />
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

        {selectedPost && loaded && !hasError && visible && (
          <NewCommentForm />
        )}
      </div>
    </div>
  );
};
