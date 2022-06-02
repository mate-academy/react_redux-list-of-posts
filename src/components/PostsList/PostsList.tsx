import React, {
  useCallback,
  useEffect,
} from 'react';

import {
  fetchUserPostsById,
  selectors,
  setSelectedPostId,
  setFilterByUserId,
  deleteUserPostById,
} from '../../store/listOfPostsSlice';
import {
  useAppDispatch,
  useAppSelector,
} from '../../typedHooks/hooks';

import { Loader } from '../Loader';
import './PostsList.scss';

export const PostsList: React.FC<{}> = React.memo(() => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUserPostsById(0));
  }, []);

  const posts = useAppSelector(selectors.getPosts);
  const isPostListLoading = useAppSelector(selectors.getIsPostListLoading);
  const filterByUserId = useAppSelector(selectors.getFilterByUserId);
  const selectedPostId = useAppSelector(selectors.getSelectedPostId);

  const selectCommentBtnClickHandler = useCallback((postId: number) => {
    if (selectedPostId === postId) {
      dispatch(setSelectedPostId(0));

      return;
    }

    dispatch(setSelectedPostId(postId));
  }, [selectedPostId]);

  return (
    <>
      <header className="PostsList__filter-props-block">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            value={filterByUserId}
            onChange={({ target }) => {
              dispatch(fetchUserPostsById(+target.value));
              dispatch(setFilterByUserId(+target.value));
            }}
          >
            <option value="0">All users</option>
            <option value="1">Leanne Graham</option>
            <option value="2">Ervin Howell</option>
            <option value="3">Clementine Bauch</option>
            <option value="4">Patricia Lebsack</option>
            <option value="5">Chelsey Dietrich</option>
            <option value="6">Mrs. Dennis Schulist</option>
            <option value="7">Kurtis Weissnat</option>
            <option value="8">Nicholas Runolfsdottir V</option>
            <option value="9">Glenna Reichert</option>
            <option value="10">Leanne Graham</option>
          </select>
        </label>
      </header>

      {isPostListLoading ? (
        <h2>
          Loading
        </h2>
      )
        : (
          <div className="PostsList">
            <h2>Posts:</h2>

            <ul className="PostsList__list">
              {posts.map((post) => (
                <li
                  key={post.id}
                  className="PostsList__item"
                >
                  <div>
                    <b>
                      [User #
                      {post.userId}
                      ]:
                    </b>
                    {post.title}
                  </div>
                  <div>
                    <button
                      type="button"
                      className="PostsList__button button"
                      onClick={() => {
                        selectCommentBtnClickHandler(post.id);
                      }}
                    >
                      {selectedPostId === post.id
                        ? 'Close'
                        : 'Open'}
                    </button>
                    <button
                      type="button"
                      className="PostsList__button button"
                      onClick={() => {
                        dispatch(deleteUserPostById(post.id));
                      }}
                    >
                      X
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      {isPostListLoading && (
        <Loader />
      )}
    </>
  );
});
