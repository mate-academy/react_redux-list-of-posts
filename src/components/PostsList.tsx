/* eslint-disable jsx-a11y/control-has-associated-label */

import classNames from 'classnames';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../app/store';
import { setSelectedPost } from '../features/selectedPostSlice';
import { clearComments } from '../features/commentsSlice';

export const PostsList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const posts = useSelector((s: RootState) => s.posts.items);
  const selectedPostId = useSelector((s: RootState) => s.selectedPost.id);

  const handleSelect = (id: number) => {
    if (selectedPostId === id) {
      // якщо клікнули по відкритому посту → закрити
      dispatch(setSelectedPost(null));
      dispatch(clearComments());
    } else {
      // відкриваємо новий пост
      dispatch(setSelectedPost(id));
      dispatch(clearComments());
    }
  };

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
                    'is-light': post.id !== selectedPostId,
                  })}
                  onClick={() => handleSelect(post.id)}
                >
                  {post.id === selectedPostId ? 'Close' : 'Open'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
