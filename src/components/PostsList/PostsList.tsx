/* eslint-disable no-nested-ternary */
import React, { useEffect } from 'react';
import {
  useDispatch,
  useSelector,
} from 'react-redux';

import './PostsList.scss';

import { Loader } from '../Loader';

import {
  getIsPostListLoadingSelector,
  getIsPostLoadingSelector,
  getPostsDeleteTargets,
  getSelectedPostIdSelector,
  getVisiblePostsSelector,
} from '../../store/PostsReducer/selectors';
import {
  deletePostAction,
  loadPostFromServerByIDAction,
  loadPostsFromServerAction,
} from '../../store/PostsReducer/actions';
import { getUserSelector } from '../../store/UserReducer/selectors';

export const PostsList: React.FC = React.memo(() => {
  const dispatch = useDispatch();

  const user = useSelector(getUserSelector);
  const visiblePosts = useSelector(getVisiblePostsSelector);
  const isPostListLoading = useSelector(getIsPostListLoadingSelector);
  const selectedPostId = useSelector(getSelectedPostIdSelector);
  const isPostLoading = useSelector(getIsPostLoadingSelector);
  const deleteTargets = useSelector(getPostsDeleteTargets);

  useEffect(() => {
    dispatch(loadPostsFromServerAction());
  }, []);

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul
        className="PostsList__list"
        data-cy="postDetails"
      >
        {visiblePosts.map(post => (
          <li
            key={post.id}
            className="PostsList__item"
          >
            <div>
              <b>
                {`[User #${post.userId}]: `}
              </b>
              {post.title}
            </div>

            <div>
              <button
                type="button"
                className="PostsList__button button"
                onClick={() => {
                  dispatch(loadPostFromServerByIDAction(
                    post.id,
                    selectedPostId,
                  ));
                }}
                disabled={isPostLoading && selectedPostId === post.id}
              >
                {isPostLoading && selectedPostId === post.id
                  ? <Loader size="small" />
                  : selectedPostId === post.id
                    ? 'Close' : 'Open'}
              </button>

              <button
                type="button"
                className="PostsList__button button"
                onClick={() => {
                  dispatch(
                    deletePostAction(
                      post.id,
                      user,
                    ),
                  );
                }}
                disabled={deleteTargets.includes(post.id)}
              >
                {deleteTargets.includes(post.id)
                  ? <Loader size="small" />
                  : 'X'}
              </button>
            </div>
          </li>
        ))}

        {isPostListLoading && (
          <Loader size="big" />
        )}
      </ul>
    </div>
  );
});
