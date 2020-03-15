import React, { FC, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Post } from '../Post';

import { getVisiblePosts } from '../../utils/helpers';
import { InitialState, FullPost } from '../../constants/types';
import { deletePost } from '../../store/actions';
import './PostList.css';

interface StateProps {
  posts: FullPost[];
  filterValue: string;
}


export const PostList: FC = () => {
  const { posts, filterValue } = useSelector<InitialState, StateProps>((state: InitialState) => ({
    posts: state.posts,
    filterValue: state.filterValue,
  }));

  const dispatch = useDispatch();

  const visiblePosts = useMemo(
    () => getVisiblePosts(posts, filterValue),
    [posts, filterValue],
  );

  return (
    <ul className="post-list">
      {visiblePosts.map(post => (
        <li
          key={post.id}
          className="post-item"
        >
          <Post post={post} />
          <button
            type="button"
            className="delete-item-btn"
            onClick={() => {
              dispatch(deletePost(post.id));
            }}
          >
            X
          </button>
        </li>
      ))}
    </ul>
  );
};
