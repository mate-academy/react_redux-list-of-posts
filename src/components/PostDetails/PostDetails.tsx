import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './PostDetails.scss';

import { deleteCommentFromServer } from '../../api/comments';

import { NewCommentForm } from '../NewCommentForm';
import { Loader } from '../Loader';

import { getSelectedPostSelector } from '../../store/PostsReducer/selectors';
import {
  getDeleteTargets,
  getIsCommentsVisibleSelector,
  getIsDeleteCommentLoadingSelector, getSelectedPostCommentsSelector,
} from '../../store/CommentsReducer/selectors';
import {
  setDeleteTargetsAction,
  setIsCommentsVisibleAction,
  setIsDeleteCommentLoadingAction,
} from '../../store/CommentsReducer/actions';

type Props = {
  getComments: () => Promise<void>;
};

export const PostDetails: React.FC<Props> = React.memo(({
  getComments,
}) => {
  const dispatch = useDispatch();

  const selectedPost = useSelector(getSelectedPostSelector);
  const selectedPostComments = useSelector(getSelectedPostCommentsSelector);
  const isCommentsVisible = useSelector(getIsCommentsVisibleSelector);
  const isDeleteCommentLoading = useSelector(getIsDeleteCommentLoadingSelector);
  const deleteTargets = useSelector(getDeleteTargets);

  const deleteComment = useCallback(async (id: number) => {
    dispatch(setIsDeleteCommentLoadingAction(true));

    await deleteCommentFromServer(id);
    await getComments();

    dispatch(setIsDeleteCommentLoadingAction(false));
    dispatch(setDeleteTargetsAction(id, false));
  }, [getComments]);

  return (
    <div
      className="PostDetails"
      data-cy="postDetails"
    >
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>
          {selectedPost?.body}
        </p>
      </section>

      <section className="PostDetails__comments">
        <button
          type="button"
          className="button"
          onClick={() => {
            dispatch(setIsCommentsVisibleAction(!isCommentsVisible));
          }}
        >
          {`${isCommentsVisible ? ('Hide') : ('Show')} ${selectedPostComments.length} comments`}
        </button>

        <ul className="PostDetails__list">
          {isCommentsVisible && (
            selectedPostComments.map(comment => (
              <li
                key={comment.id}
                className="PostDetails__list-item"
              >
                <button
                  type="button"
                  className="PostDetails__remove-button button"
                  onClick={() => {
                    deleteComment(comment.id);
                    dispatch(setDeleteTargetsAction(comment.id, true));
                  }}
                  disabled={isDeleteCommentLoading
                    && deleteTargets.includes(comment.id)}
                >
                  {isDeleteCommentLoading && deleteTargets.includes(comment.id)
                    ? (<Loader />)
                    : 'X'}
                </button>
                <p>
                  {comment.body}
                </p>
              </li>
            ))
          )}

        </ul>
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            getComments={getComments}
          />
        </div>
      </section>
    </div>
  );
});
