import React, { useEffect } from 'react';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import './PostsList.scss';
import { Loader } from '../Loader';
import {
  getDisplayedPosts,
  getMessage,
  getPostId,
  getPosts,
  getUserId,
  isLoading,
} from '../../store/selectors';
import { setPostId } from '../../store/postId';
import { loadPosts } from '../../store';
import { setPosts } from '../../store/posts';

export const PostsList: React.FC = () => {
  const dispatch = useDispatch();
  const selectedUser = useSelector(getUserId);
  const selectedPostId = useSelector(getPostId);
  const isPostsLoading = useSelector(isLoading);
  const postsFromServer = useSelector(getPosts);
  const posts = useSelector(getDisplayedPosts);
  const message = useSelector(getMessage);

  const handleRemovePost = (postId: number) => {
    const updatedPosts = postsFromServer.filter((post) => (
      post.id !== postId
    ));

    dispatch(setPosts(updatedPosts));
  };

  useEffect(() => {
    dispatch(loadPosts(+selectedUser));
  }, []);

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list" data-cy="postDetails">
        {(isPostsLoading && !posts.length) && <Loader />}
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
              <div className="PostsList__buttons">
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
                <button
                  type="button"
                  className="PostsList__button button button--remove"
                  onClick={() => handleRemovePost(post.id)}
                >
                  ❌
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
