import classNames from 'classnames';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import * as selectedActions from '../features/selectedPostSlice';

export const PostsList: React.FC = () => {
  const { items } = useAppSelector(state => state.posts);
  const { userPost } = useAppSelector(state => state.selectedPost);
  const dispatch = useAppDispatch();

  return (
    <div data-cy="PostsList">
      <p className="title">Posts:</p>

      <table className="table is-fullwidth is-striped is-hoverable is-narrow">
        <thead>
          <tr className="has-background-link-light">
            <th>#</th>
            <th>Title</th>
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
                  className={classNames(
                    'button',
                    'is-link',
                    {
                      'is-light': item.id !== userPost?.id,
                    },
                  )}
                  onClick={() => {
                    if (userPost?.id === item.id) {
                      dispatch(selectedActions.resetPost());
                    } else {
                      dispatch(selectedActions.setPost(item));
                    }
                  }}
                >
                  {item.id === userPost?.id ? 'Close' : 'Open'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
