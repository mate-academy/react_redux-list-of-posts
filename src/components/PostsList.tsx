/* eslint-disable jsx-a11y/control-has-associated-label */

import classNames from 'classnames';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { Post } from '../types/Post';
import { setCurrentPost } from '../features/currentPost';
import { userPostsList } from '../features/userPostSlice';
import { Loader } from './Loader';

export const PostsList: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentPost = useAppSelector(state => state.currentPost);
  const status = useAppSelector(state => state.userPosts.status);
  const posts = useAppSelector(userPostsList);
  const handleCurrentPost = (post: Post | null) => {
    dispatch(setCurrentPost(post));
  };

  if (status === 'loading') {
    <Loader />;
  }

  return (
    <div data-cy="PostsList">
      <p className="title">Posts:</p>

      <table className="table is-fullwidth is-striped is-hoverable is-narrow">
        <thead>
          <tr className="has-background-link-light">
            <th>#</th>
            <th>Title</th>
            <th> </th>
          </tr>
        </thead>

        <tbody>
          {posts.map(post => (
            <tr key={post.id} data-cy="Post">
              <td data-cy="PostId">{post.id}</td>
              <td data-cy="PostTitle">{post.title}</td>
              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={classNames('button', 'is-link', {
                    'is-light': post.id !== currentPost.currentPost?.id,
                  })}
                  onClick={() => {
                    handleCurrentPost(
                      post.id === currentPost.currentPost?.id ? null : post,
                    );
                  }}
                >
                  {post.id === currentPost.currentPost?.id ? 'Close' : 'Open'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
