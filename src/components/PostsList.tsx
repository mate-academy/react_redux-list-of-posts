/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { postsActions } from '../features/slices/postsSlice';

export const PostsList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { posts, currentPost } = useAppSelector(state => state.posts);

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
                  className={classNames(
                    'button',
                    'is-link',
                    {
                      'is-light': post.id !== currentPost?.id,
                    },
                  )}
                  onClick={() => {
                    dispatch(postsActions.setCurrentPost(
                      post.id === currentPost?.id ? null : post,
                    ));
                  }}
                >
                  {post.id === currentPost?.id ? 'Close' : 'Open'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
