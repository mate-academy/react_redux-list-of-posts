import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import { deleteComment } from '../../api/comments';
import { loadComments, loadPostDetails, selectors } from '../../store';

type Props = {
  postId: number,
};

export const PostDetails: React.FC<Props> = React.memo(({ postId }) => {
  const dispatch = useDispatch();
  const postDetails = useSelector(selectors.getPostDetails);
  const comments = useSelector(selectors.getComments);
  const [isCommentsVisible, setIsCommentsVisible] = useState(false);
  const loadDetailsError = useSelector(selectors.getLoadDetailsError);
  const loadCommentsError = useSelector(selectors.getLoadCommentsError);

  const onCommentVisibilityChange = () => {
    setIsCommentsVisible(!isCommentsVisible);
  };

  useEffect(() => {
    dispatch(loadPostDetails(postId));

    dispatch(loadComments(postId));
  }, [postId]);

  const onCommentDeleting = useCallback(async (commentId) => {
    await deleteComment(commentId);

    await dispatch(loadComments(postId));
  }, [comments, postId]);

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      {loadDetailsError ? (
        <h3>Failed to load posts details</h3>
      ) : (
        <>
          <section className="PostDetails__post">
            <p>{postDetails?.body}</p>
          </section>

          <section className="PostDetails__comments">
            <button
              type="button"
              className="button"
              onClick={onCommentVisibilityChange}
            >
              {isCommentsVisible ? 'Hide comments' : 'Show comments'}
            </button>

            {isCommentsVisible && (
              <ul data-cy="postDetails" className="PostDetails__list">
                {loadCommentsError && (
                  <span>Failed to load posts comments</span>
                )}

                {comments.map(comment => (
                  <li key={comment.id} className="PostDetails__list-item">
                    <button
                      type="button"
                      className="PostDetails__remove-button button"
                      onClick={() => onCommentDeleting(comment.id)}
                    >
                      X
                    </button>
                    <p>{comment.body}</p>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section>
            <div className="PostDetails__form-wrapper">
              <NewCommentForm
                postId={postId}
                reloadComments={() => dispatch(loadComments(postId))}
              />
            </div>
          </section>
        </>
      )}
    </div>
  );
});
