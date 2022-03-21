import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  changePostAction,
  loadPostsAction,
} from '../../store/actions';
import {
  getPostIdSelector,
  getPostsSelector,
  getUserIdSelector,
} from '../../store/selectors';

import { getPosts } from '../api/posts';
import { SelectUser } from '../SelectUser';

import './PostsList.scss';

export const PostsList: React.FC = () => {
  const userId = useSelector(getUserIdSelector);
  const postId = useSelector(getPostIdSelector);
  const posts = useSelector(getPostsSelector);

  const dispatch = useDispatch();

  const loadPosts = async () => {
    const postsFromServer = await getPosts(userId);

    dispatch(loadPostsAction(postsFromServer));
  };

  useEffect(() => {
    loadPosts();
  }, [userId]);

  const openPost = async (postIdd: number) => {
    dispatch(changePostAction(postIdd));
  };

  return (
    <div className="PostsList">
      <h2>Posts:</h2>
      <SelectUser />

      <ul className="PostsList__list">
        {posts.map(post => (
          <li className="PostsList__item" key={post.id}>
            <div>
              <b>{`[User #${post.userId}]: `}</b>
              {post.title}
              {post.body}
            </div>
            <button
              type="button"
              className="PostsList__button button"
              onClick={post.id !== postId
                ? (() => openPost(post.id))
                : (() => openPost(0))}
            >
              {post.id === postId ? 'Hide' : 'Show'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
