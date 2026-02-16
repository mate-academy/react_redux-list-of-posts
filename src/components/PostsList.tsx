/* eslint-disable jsx-a11y/control-has-associated-label */

import classNames from 'classnames';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { Post } from '../types/Post';
import { selectedPostSlice } from '../features/selectedPostSlice';

export const PostsList: React.FC = () => {
  const { items } = useAppSelector(state => state.posts);
  const selectedPost = useAppSelector(state => state.post.post);
  const selectedPostId = selectedPost ? selectedPost.id : 0;
  const dispatch = useAppDispatch();

  const handleSelectPost = (post: Post) => () => {
    if (post.id === selectedPostId) {
      dispatch(selectedPostSlice.actions.clear());
    } else {
      dispatch(selectedPostSlice.actions.select(post));
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
          {items.map(post => (
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
                  onClick={handleSelectPost(post)}
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
