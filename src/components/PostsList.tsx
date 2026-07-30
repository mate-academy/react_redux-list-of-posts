/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import React from 'react';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import { actions as postActions } from '../features/selectedPost/selectedPost';

export const PostsList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector(state => state.posts);
  const selectedPostId = useAppSelector(state => state.selectedPost?.id);

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
          {items.map(item => (
            <tr key={item.id} data-cy="Post">
              <td data-cy="PostId">{item.id}</td>
              <td data-cy="PostTitle">{item.title}</td>
              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={classNames('button', 'is-link', {
                    'is-light': item.id !== selectedPostId,
                  })}
                  onClick={() => {
                    dispatch(postActions.togglePost(item));
                  }}
                >
                  {item.id === selectedPostId ? 'Close' : 'Open'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
