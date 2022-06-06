import React, { useEffect } from 'react';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { Post } from '../../types/Post';
import './PostsList.scss';
import { Loader } from '../Loader';
import {
  getDisplayedPosts,
  getMessage,
  getPostId,
  getUserId,
  isLoading,
} from '../../store/selectors';
import { setPostId } from '../../store/postId';
import { loadPosts } from '../../store';

export const PostsList: React.FC = () => {
  const dispatch = useDispatch();
  const selectedUser = useSelector(getUserId);
  const selectedPostId = useSelector(getPostId);
  const isPostsLoading = useSelector(isLoading);
  const posts: Post[] = useSelector(getDisplayedPosts);
  const message = useSelector(getMessage);

  useEffect(() => {
    dispatch(loadPosts(+selectedUser));
  }, [selectedUser]);

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list" data-cy="postDetails">
        {(isPostsLoading && !posts) && <Loader />}
        {message}
        {(!isPostsLoading || posts) && posts.map((post) => {
          const isOpen = selectedPostId === post.id;

          return (
            <li
              key={post.id}
              className="PostsList__item"
            >
              <div>
                <b>{`[User #${post.userId}]: `}</b>
                {post.title}
              </div>
              <button
                type="button"
                className={classNames(
                  'PostsList__button', 'button',
                  {
                    'PostsList__user-button': isOpen,
                  },
                )}
                onClick={() => dispatch(setPostId(post.id))}
              >
                {isOpen ? 'Close' : 'Open'}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
