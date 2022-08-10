import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../Hooks';
import {
  fetchAllUsersPosts,
  getSelectPostId,
  fetchUserPostById,
  deletePost,
} from '../../store/postsSlice';

import './PostsList.scss';

export const PostsList: React.FC = () => {
  const dispatch = useAppDispatch();

  const selectedUserId = useAppSelector(state => state
    .users.selectedUserId);

  useEffect(() => {
    if (selectedUserId) {
      dispatch(fetchUserPostById(selectedUserId));
    } else {
      dispatch(fetchAllUsersPosts());
    }
  }, [selectedUserId]);

  const posts = useAppSelector(state => state.posts.posts);
  const selectPostId = useAppSelector(state => state.posts.selectedPostId);

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {posts && (posts.map((post: Post) => (
          <li
            className="PostsList__item"
            key={post.id}
          >
            <div>
              <b>{`User #${post.userId}: ${post.title}`}</b>

            </div>
            <div>
              { selectPostId === post.id ? (
                <button
                  type="button"
                  className="PostsList__button button"
                  onClick={() => {
                    dispatch(getSelectPostId(0));
                  }}
                >
                  Close
                </button>
              ) : (
                <button
                  type="button"
                  className="PostsList__button button"
                  onClick={() => {
                    dispatch(getSelectPostId(post.id));
                  }}
                >
                  Open
                </button>
              )}

              <button
                type="button"
                className="PostsList__button button"
                onClick={() => {
                  dispatch(deletePost(post.id));
                }}
              >
                х
              </button>
            </div>

          </li>
        )))}
      </ul>

    </div>
  );
};
