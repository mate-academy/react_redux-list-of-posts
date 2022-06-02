import React, { useEffect } from 'react';
import {
  useDispatch,
  useSelector,
} from 'react-redux';

import './PostsList.scss';

import { Loader } from '../Loader';

import {
  getIsPostListLoadingSelector,
  getPostsSelector,
  getSelectedPostIdSelector,
} from '../../store/PostsReducer/selectors';
import {
  loadPostFromServerByIDAction,
  loadPostsFromServerAction,
} from '../../store/PostsReducer/actions';

export const PostsList: React.FC = React.memo(() => {
  const dispatch = useDispatch();
  const posts = useSelector(getPostsSelector);
  const isPostListLoading = useSelector(getIsPostListLoadingSelector);
  const selectedPostId = useSelector(getSelectedPostIdSelector);

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
        {posts.map(post => (
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

            <button
              type="button"
              className="PostsList__button button"
              onClick={() => {
                dispatch(loadPostFromServerByIDAction(
                  post.id,
                  selectedPostId,
                ));
              }}
            >
              {selectedPostId === post.id ? 'Close' : 'Open'}
            </button>
          </li>
        ))}

        {isPostListLoading && (
          <Loader />
        )}
      </ul>

    </div>
  );
});
