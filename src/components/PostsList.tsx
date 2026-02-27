/* eslint-disable jsx-a11y/control-has-associated-label */

import classNames from 'classnames';
import React, { useEffect } from 'react';
import * as postActions from '../features/selectedPost/selectedPostSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';

export const PostsList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items: posts } = useAppSelector(state => state.posts);
  const { selectedPost } = useAppSelector(state => state.selectedPost);
  const { user } = useAppSelector(state => state.user);

  useEffect(() => {
    dispatch(postActions.setPost(null));
  }, [user, dispatch]);

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
          {posts?.map(post => (
            <tr key={post.id} data-cy="Post">
              <td data-cy="PostId">{post.id}</td>
              <td data-cy="PostTitle">{post.title}</td>
              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={classNames('button', 'is-link', {
                    'is-light': post.id !== selectedPost?.id,
                  })}
                  onClick={() => {
                    if (selectedPost?.id === post.id) {
                      dispatch(postActions.setPost(null));
                    } else {
                      dispatch(postActions.setPost(post));
                    }
                  }}
                >
                  {post.id === selectedPost?.id ? 'Close' : 'Open'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
