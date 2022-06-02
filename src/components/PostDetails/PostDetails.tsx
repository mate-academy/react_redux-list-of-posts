import { FC, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './PostDetails.scss';

import { NewCommentForm } from '../NewCommentForm';
import { Loader } from '../Loader';

import {
  getSelectedPostIdSelector,
  getSelectedPostSelector,
} from '../../store/PostsReducer/selectors';
import {
  getDeleteTargets,
  getIsCommentsVisibleSelector,
  getIsDeleteCommentLoadingSelector, getSelectedPostCommentsSelector,
} from '../../store/CommentsReducer/selectors';
import {
  deleteCommentAction,
  setDeleteTargetsAction,
  setIsCommentsVisibleAction,
} from '../../store/CommentsReducer/actions';

export const PostDetails: FC = memo(() => {
  const dispatch = useDispatch();

  const selectedPost = useSelector(getSelectedPostSelector);
  const selectedPostComments = useSelector(getSelectedPostCommentsSelector);
  const isCommentsVisible = useSelector(getIsCommentsVisibleSelector);
  const isDeleteCommentLoading = useSelector(getIsDeleteCommentLoadingSelector);
  const deleteTargets = useSelector(getDeleteTargets);
  const selectedPostId = useSelector(getSelectedPostIdSelector);

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
            dispatch(
              setIsCommentsVisibleAction(!isCommentsVisible),
            );
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
                    dispatch(
                      setDeleteTargetsAction(
                        comment.id,
                        true,
                      ),
                    );

                    dispatch(
                      deleteCommentAction(
                        comment.id,
                        selectedPostId,
                      ),
                    );
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
          <NewCommentForm />
        </div>
      </section>
    </div>
  );
});
